package com.cabbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String licenseNumber; // Aadhar or License

    private String vehicleName;
    private String vehicleType; // Sedan, SUV, etc.
    private String vehiclePlate;
    private Integer capacity;

    private Double rating = 5.0;
    private Boolean isOnline = false;

    private String currentLocation; // "lat,lng"
}
