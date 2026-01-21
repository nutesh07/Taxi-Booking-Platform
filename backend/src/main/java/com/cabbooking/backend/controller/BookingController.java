package com.cabbooking.backend.controller;

import com.cabbooking.backend.entity.Booking;
import com.cabbooking.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(Authentication authentication,
            @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(bookingService.createBooking(authentication.getName(), request));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getUserBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getUserBookings(authentication.getName()));
    }

    @GetMapping("/driver-bookings")
    public ResponseEntity<List<Booking>> getDriverBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getDriverBookings(authentication.getName()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(bookingService.updateStatus(id, request.get("status")));
    }
}
