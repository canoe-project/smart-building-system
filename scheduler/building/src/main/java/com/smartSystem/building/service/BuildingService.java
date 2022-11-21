package com.smartSystem.building.service;

import com.smartSystem.building.model.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smartSystem.building.repository.BuildingRepository;

@Service
public class BuildingService {
    @Autowired
    private BuildingRepository buildingRepository;

    public void write(Building building) throws Exception{
        buildingRepository.save(building);
    }
}
