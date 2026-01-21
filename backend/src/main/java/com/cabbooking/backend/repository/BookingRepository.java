package com.cabbooking.backend.repository;

import com.cabbooking.backend.entity.Booking;
import com.cabbooking.backend.entity.Driver;
import com.cabbooking.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);

    List<Booking> findByDriver(Driver driver);
}
