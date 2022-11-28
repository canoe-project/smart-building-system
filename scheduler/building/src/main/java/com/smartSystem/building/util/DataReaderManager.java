package com.smartSystem.building.util;

import com.smartSystem.building.model.Room;
import com.smartSystem.building.model.RoomState;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DataReaderManager {

    private PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
    private String[] fileNames;
    private ArrayList<DataReader> dataReaders = new ArrayList<>();
    private int count = 0;

    private static volatile DataReaderManager instance;
    private static Object mutex = new Object();

    public DataReaderManager() {
    }

    public void init() throws IOException {
        Resource[] resources = pathMatchingResourcePatternResolver.getResources("data/KETI/*");
        this.fileNames = Arrays.stream(resources).map(Resource::getFilename).toArray(String[]::new);
        this.count = 0;

        Arrays.stream(this.fileNames).parallel().forEach(name -> {
            try {
                this.dataReaders.add(new DataReader(name , this.count));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public static DataReaderManager getInstance() throws IOException {
        DataReaderManager result = instance;
        if (result == null) {
            synchronized (mutex) {
                result = instance;
                if (result == null)
                {
                    instance = result = new DataReaderManager();
                }
            }
        }
        return result;
    }

    public ArrayList<RoomState>  runner(){
        ArrayList<RoomState> roomStateArrayList = new ArrayList<>();
        dataReaders.forEach(dataReader -> dataReader.run());
        dataReaders.forEach(dataReader -> {
            RoomState roomState = new RoomState();
            Room room =new Room();

            room.setRoomName(dataReader.getRoomNumber());
            roomState.setRoom(room);
            roomState.setCo2(dataReader.getCo2());
            roomState.setHumidity(dataReader.getHumidity());
            roomState.setLight(dataReader.getLight());
            roomState.setPir(dataReader.getPir());
            roomState.setTemperature(dataReader.getTemperature());
            roomStateArrayList.add(roomState);
        });
        return roomStateArrayList;
    }

    public PathMatchingResourcePatternResolver getPathMatchingResourcePatternResolver() {
        return pathMatchingResourcePatternResolver;
    }

    public void setPathMatchingResourcePatternResolver(PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver) {
        this.pathMatchingResourcePatternResolver = pathMatchingResourcePatternResolver;
    }

    public String[] getFileNames() {
        return fileNames;
    }

    public void setFileNames(String[] fileNames) {
        this.fileNames = fileNames;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
