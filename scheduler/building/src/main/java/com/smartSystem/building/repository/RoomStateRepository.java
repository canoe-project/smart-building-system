package com.smartSystem.building.repository;

import com.smartSystem.building.model.Room;
import com.smartSystem.building.model.RoomState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomStateRepository extends JpaRepository<RoomState, Long> {

}
