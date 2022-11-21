package com.smartSystem.building.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuildingController {
//    @Autowired
//    private BuildingService buildingService;
//
//    @GetMapping("/index")
//    public String boardWriteForm() throws Exception {
//
//        Building building = new Building("testName","test");
//        buildingService.write(building);
//
//        return "test";
//    }
    @RequestMapping(value = "/test")
    public String sayHello() {
        return "test";
    }
}
