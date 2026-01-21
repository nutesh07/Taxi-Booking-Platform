package com.cabbooking.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cabs")
public class Cab {
    // This entity might be redundant if Driver holds vehicle info, 
    // but useful for Admin management of approved vehicle types or fleet.
    // For now, we'll keep it simple and rely on Driver entity for vehicle details as per frontend.
    // But to satisfy "Cab" requirement if needed strictly:
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Sedan, Mini, SUV
    private Double baseRate;
    private Double ratePerKm;
}
