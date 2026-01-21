package com.cabbooking.backend.service;

import com.cabbooking.backend.entity.Booking;
import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import com.cabbooking.backend.repository.BookingRepository;
import com.cabbooking.backend.repository.DriverRepository;
import com.cabbooking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    public Booking createBooking(String userEmail, Map<String, Object> request) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setPickupLocation((String) request.get("pickupLocation"));
        booking.setDropLocation((String) request.get("dropLocation"));
        booking.setDistance(Double.valueOf(request.get("distance").toString()));
        booking.setFare(Double.valueOf(request.get("fare").toString()));
        booking.setStatus("PENDING");
        booking.setPaymentMethod((String) request.get("paymentMethod"));

        // Assign specific driver if provided
        if (request.containsKey("driverId")) {
            Long driverId = Long.valueOf(request.get("driverId").toString());
            Driver driver = driverRepository.findById(driverId)
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
            booking.setDriver(driver);
        } else {
            throw new RuntimeException("Driver ID is required");
        }

        return bookingRepository.save(booking);
    }

    public Booking updateStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return bookingRepository.findByUser(user);
    }

    public List<Booking> getDriverBookings(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Driver driver = driverRepository.findByUser(user).orElseThrow();
        return bookingRepository.findByDriver(driver);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
