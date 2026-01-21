package com.cabbooking.backend.service;

import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import com.cabbooking.backend.repository.DriverRepository;
import com.cabbooking.backend.repository.UserRepository;
import com.cabbooking.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> registerUser(Map<String, String> request) {
        if (userRepository.findByEmail(request.get("email")).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.get("name"));
        user.setEmail(request.get("email"));
        user.setPhone(request.get("phone"));
        user.setPassword(passwordEncoder.encode(request.get("password")));
        user.setRole(request.get("role").toUpperCase()); // USER, DRIVER, ADMIN

        User savedUser = userRepository.save(user);

        // If role is DRIVER, create Driver entity
        if ("DRIVER".equalsIgnoreCase(savedUser.getRole())) {
            Driver driver = new Driver();
            driver.setUser(savedUser);
            driver.setLicenseNumber(request.get("aadhar")); // Using aadhar as license/id
            driver.setVehicleName(request.get("carName"));
            driver.setVehicleType(request.get("carType"));
            // driver.setVehiclePlate(request.get("vehiclePlate")); // Frontend doesn't send
            // plate in register?
            // Let's assume plate is not sent or we generate dummy
            driver.setVehiclePlate("MH04AB" + (1000 + (int) (Math.random() * 9000)));
            driver.setCapacity(Integer.parseInt(request.get("seats")));
            driver.setIsOnline(true); // Default online
            driverRepository.save(driver);
        }

        return generateAuthResponse(savedUser);
    }

    public Map<String, Object> login(Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userRepository.findByEmail(email).orElseThrow();
        return generateAuthResponse(user);
    }

    private Map<String, Object> generateAuthResponse(User user) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }
}
