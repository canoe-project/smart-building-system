package com.smartSystem.building.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "room_state")
public class RoomState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = {CascadeType.ALL})
    private Room room;
//humidity,light,pir,temperature,room_ID

    @Column(name = "co2")
    private Float co2;
    @Column(name = "humidity")
    private Float humidity;
    @Column(name = "light")
    private Float light;

    @Column(name = "pir")
    private Float pir;

    @Column(name = "temperature")
    private Float temperature;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @LastModifiedDate
    private LocalDateTime modifiedDate = LocalDateTime.now();;


    public RoomState() {

    }

    public RoomState(long id, Room room, Float humidity, Float light, Float pir, Float temperature) {
        this.id = id;
        this.room = room;
        this.humidity = humidity;
        this.light = light;
        this.pir = pir;
        this.temperature = temperature;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getLight() {
        return light;
    }

    public void setLight(Float light) {
        this.light = light;
    }

    public Float getPir() {
        return pir;
    }

    public void setPir(Float pir) {
        this.pir = pir;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
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

    public Float getCo2() {
        return co2;
    }

    public void setCo2(Float co2) {
        this.co2 = co2;
    }
}
