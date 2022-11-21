package com.smartSystem.building.job;

import com.smartSystem.building.model.Building;
import com.smartSystem.building.model.RoomState;
import com.smartSystem.building.service.BuildingService;
import com.smartSystem.building.service.RoomService;
import com.smartSystem.building.service.RoomStateService;
import com.smartSystem.building.util.DataReader;
import com.smartSystem.building.util.DataReaderManager;
import lombok.extern.slf4j.Slf4j;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Component
public class BuildingDataUploader implements Job {

    final RoomStateService roomStateService;
    final RoomService roomService;
    private final DataReaderManager dataReaderManager = DataReaderManager.getInstance();

    public BuildingDataUploader(RoomStateService roomStateService, RoomService roomService) throws IOException {
        this.roomStateService = roomStateService;
        this.roomService = roomService;
    }
    @Override
    public void execute(JobExecutionContext context)
    {
//        System.out.println("test");
        ArrayList<RoomState> roomStateArrayList = dataReaderManager.runner();
        roomStateArrayList.forEach( roomState -> {
            try {
                roomStateService.writeState(roomState,roomState.getRoom().getRoomName());
//                roomStateService.write(roomState);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}
