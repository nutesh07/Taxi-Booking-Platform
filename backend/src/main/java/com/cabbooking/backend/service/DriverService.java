package com.cabbooking.backend.service;

import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import com.cabbooking.backend.repository.DriverRepository;
import com.cabbooking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private UserRepository userRepository;

    public Driver getDriverProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return driverRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Driver profile not found"));
    }

    public List<Driver> getAvailableDrivers() {
        // Simple logic: return all online drivers. In real app, filter by location.
        return driverRepository.findAll().stream()
                .filter(Driver::getIsOnline)
                .collect(Collectors.toList());
    }

    public Driver updateLocation(String email, String location) {
        Driver driver = getDriverProfile(email);
        driver.setCurrentLocation(location);
        return driverRepository.save(driver);
    }

    public Driver toggleStatus(String email) {
        Driver driver = getDriverProfile(email);
        driver.setIsOnline(!driver.getIsOnline());
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }
}
