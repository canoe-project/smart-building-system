package com.smartSystem.building.service;

import com.smartSystem.building.model.Building;
import com.smartSystem.building.model.Room;
import com.smartSystem.building.repository.BuildingRepository;
import com.smartSystem.building.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public void write(Room Room) throws Exception{
        roomRepository.save(Room);
    }

}
