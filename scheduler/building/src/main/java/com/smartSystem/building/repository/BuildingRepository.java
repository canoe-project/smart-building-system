package com.smartSystem.building.repository;

import com.smartSystem.building.model.Building;
import com.smartSystem.building.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    Building findByBuildingName(String buildingName);
}
