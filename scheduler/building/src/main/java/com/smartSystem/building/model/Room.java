package com.smartSystem.building.model;

import javax.persistence.*;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @OneToMany(fetch = FetchType.EAGER ,cascade = {CascadeType.ALL})
    private Set<RoomState> roomState = new HashSet<>();

    @ManyToOne( cascade = {CascadeType.ALL})
    @JoinColumn(name = "building_id")
    private Building building;

    @Column
    private String roomName;

    @Column
    private String description;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();;

    @LastModifiedDate
    private LocalDateTime modifiedDate = LocalDateTime.now();;

    public Room(){
    }

    public Room(Set<RoomState> roomState, Building building, String roomName, String description) {
        this.roomState = roomState;
        this.building = building;
        this.roomName = roomName;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public Set<RoomState> getRoomState() {
        return roomState;
    }

    public void setRoomState(Set<RoomState> roomState) {
        this.roomState = roomState;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}