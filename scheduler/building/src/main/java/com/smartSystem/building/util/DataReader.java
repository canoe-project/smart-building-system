package com.smartSystem.building.util;

import java.io.IOException;
import java.util.*;

import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;

import java.io.FileReader;

import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public class DataReader implements Runnable {
    private String fileName;
    private String roomNumber;
    private int index;
    private float co2;
    private float humidity;
    private float light;
    private float pir;
    private float temperature;
    private PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver;
    private Resource[] resources;
    private HashMap<String, String> table = new HashMap<String, String>();
    void setUp() {
        pathMatchingResourcePatternResolver = new PathMatchingResourcePatternResolver();
    }
    public DataReader(String roomNumber, int index ) throws IOException {
        setUp();
        this.roomNumber = roomNumber;
        this.fileName = "data/KETI/" + roomNumber + "/*.csv";
        this.index = index;
        this.resources = pathMatchingResourcePatternResolver.getResources(this.fileName);
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public float getCo2() {
        return co2;
    }

    public void setCo2(float co2) {
        this.co2 = co2;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }

    public float getLight() {
        return light;
    }

    public void setLight(float light) {
        this.light = light;
    }

    public float getPir() {
        return pir;
    }

    public void setPir(float pir) {
        this.pir = pir;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }

    public PathMatchingResourcePatternResolver getPathMatchingResourcePatternResolver() {
        return pathMatchingResourcePatternResolver;
    }

    public void setPathMatchingResourcePatternResolver(PathMatchingResourcePatternResolver pathMatchingResourcePatternResolver) {
        this.pathMatchingResourcePatternResolver = pathMatchingResourcePatternResolver;
    }

    public Resource[] getResources() {
        return resources;
    }

    public void setResources(Resource[] resources) {
        this.resources = resources;
    }

    public HashMap<String, String> getTable() {
        return table;
    }

    public void setTable(HashMap<String, String> table) {
        this.table = table;
    }

    @Override
    public void run() {

        Arrays.stream(this.resources).forEach(resource -> {
            try {
                CSVReader c = new CSVReaderBuilder(new FileReader(resource.getFile()))
                        .withSkipLines(this.index)
                        .build();

                String[] line =  c.readNext();
                if (line == null){
                    this.index = 0;
                    c = new CSVReaderBuilder(new FileReader(resource.getFile()))
                            .withSkipLines(this.index)
                            .build();
                }
                table.put(resource.getFilename(),line[1]);
                c.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (CsvException e) {
                throw new RuntimeException(e);
            }
        });
        this.co2 = Float.parseFloat(this.table.get("co2.csv"));
        this.humidity = Float.parseFloat(this.table.get("humidity.csv"));
        this.light = Float.parseFloat(this.table.get("light.csv"));
        this.pir = Float.parseFloat(this.table.get("pir.csv"));
        this.temperature = Float.parseFloat(this.table.get("temperature.csv"));
        this.index++;
    }

}
