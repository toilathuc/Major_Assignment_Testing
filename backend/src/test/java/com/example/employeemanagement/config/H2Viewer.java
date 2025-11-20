package com.example.employeemanagement.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.test.context.ActiveProfiles;

@SpringBootApplication(scanBasePackages = "com.example.employeemanagement")
@ActiveProfiles("h2viewer")
public class H2Viewer {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(H2Viewer.class, args);

        System.out.println("======================================");
        System.out.println(" H2 VIEWER RUNNING");
        System.out.println(" 👉 http://localhost:8080/h2-console");
        System.out.println("======================================");

        Thread.currentThread().join();
    }
}
