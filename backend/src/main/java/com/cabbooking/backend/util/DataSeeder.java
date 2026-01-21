package com.cabbooking.backend.util;

import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import com.cabbooking.backend.repository.DriverRepository;
import com.cabbooking.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, DriverRepository driverRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        long count = userRepository.count();
        System.out.println("DataSeeder: Current user count = " + count);

        if (count == 0) {
            System.out.println("DataSeeder: Seeding data...");
            seedUsersAndDrivers();
        } else {
            System.out.println("DataSeeder: Data already exists. Skipping seeding.");
        }
    }

    private void seedUsersAndDrivers() {
        // 1. Create Admin
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@cab.com");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setPhone("9999999999");
        admin.setRole("ADMIN");
        admin.setWalletBalance(1000.0);
        userRepository.save(admin);

        // 2. Create Rider
        User rider = new User();
        rider.setName("Rider User");
        rider.setEmail("rider@cab.com");
        rider.setPassword(passwordEncoder.encode("password"));
        rider.setPhone("8888888888");
        rider.setRole("USER");
        rider.setWalletBalance(500.0);
        userRepository.save(rider);

        // 3. Create SINGLE Driver
        createDriver("Super Driver", "driver1@cab.com", "MH01AB1234", "Toyota Innova", "Prime SUV", 19.0760, 72.8777);

        System.out.println("Data seeding completed successfully!");
    }

    private void createDriver(String name, String email, String plate, String vehicleName, String type, double lat,
            double lng) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("password"));
        user.setPhone("777777777" + (int) (Math.random() * 10));
        user.setRole("DRIVER");
        user.setWalletBalance(100.0);
        userRepository.save(user);

        Driver driver = new Driver();
        driver.setUser(user);
        driver.setLicenseNumber("LIC" + (int) (Math.random() * 100000));
        driver.setVehicleName(vehicleName);
        driver.setVehicleType(type);
        driver.setVehiclePlate(plate);
        driver.setCapacity(4);
        driver.setRating(4.0 + Math.random()); // Random rating 4.0 - 5.0
        driver.setIsOnline(true);
        driver.setCurrentLocation(lat + "," + lng);

        driverRepository.save(driver);
    }
}
