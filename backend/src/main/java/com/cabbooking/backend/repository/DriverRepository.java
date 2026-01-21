package com.cabbooking.backend.repository;

import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByUser(User user);
}
