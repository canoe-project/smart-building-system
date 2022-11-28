package com.smartSystem.building.service;

import com.smartSystem.building.model.Building;
import com.smartSystem.building.model.Room;
import com.smartSystem.building.model.RoomState;
import com.smartSystem.building.repository.BuildingRepository;
import com.smartSystem.building.repository.RoomRepository;
import com.smartSystem.building.repository.RoomStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.JoinColumn;
import java.util.*;

@Service
public class RoomStateService {
    @Autowired
    RoomStateRepository roomStateRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    BuildingRepository buildingRepository;

    public void write(RoomState roomState) throws Exception {
        roomStateRepository.save(roomState);
    }

    public void writeState(RoomState roomState, String roomNumber) throws Exception {
        Room room = roomRepository.findByRoomName(roomNumber);
        Building building= buildingRepository.findByBuildingName("admin");
        if (room == null)
        {
            Room curRoom = new Room();
            curRoom.setRoomName(roomNumber);
            curRoom.getRoomState().add(roomState);
            roomState.setRoom(curRoom);
            if (building == null){
                building = new Building();
                building.setBuildingName("admin");
                building.setDescription("");
                curRoom.setBuilding(building);
                building.getRoom().add(curRoom);

            }else {
                curRoom.setBuilding(building);
                building.getRoom().add(curRoom);
            }
            buildingRepository.save(building);
        }
        else {
            room.getRoomState().add(roomState);
            roomState.setRoom(room);
            roomRepository.save(room);
        }
    }
}