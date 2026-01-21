package com.cabbooking.backend.controller;

import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/profile")
    public ResponseEntity<Driver> getProfile(Authentication authentication) {
        return ResponseEntity.ok(driverService.getDriverProfile(authentication.getName()));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Driver>> getAvailableDrivers() {
        return ResponseEntity.ok(driverService.getAvailableDrivers());
    }

    @PostMapping("/location")
    public ResponseEntity<Driver> updateLocation(Authentication authentication, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(driverService.updateLocation(authentication.getName(), body.get("location")));
    }

    @PostMapping("/status")
    public ResponseEntity<Driver> toggleStatus(Authentication authentication) {
        return ResponseEntity.ok(driverService.toggleStatus(authentication.getName()));
    }
}
