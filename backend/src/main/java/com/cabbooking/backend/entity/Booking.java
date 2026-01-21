package com.cabbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private String pickupLocation;
    private String dropLocation;
    
    private LocalDateTime pickupTime;
    
    private Double distance;
    private Double fare;

    private String status; // PENDING, ACCEPTED, ONGOING, COMPLETED, CANCELLED

    private String paymentMethod; // CASH, ONLINE

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
