package com.smartSystem.building;

import com.smartSystem.building.util.DataReaderManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class BuildingApplication {

	public static void main(String[] args) throws IOException {
		DataReaderManager.getInstance().init();
		SpringApplication.run(BuildingApplication.class, args);
	}

}
