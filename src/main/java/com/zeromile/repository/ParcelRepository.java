package com.zeromile.repository;

import com.zeromile.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {
    List<Parcel> findByCustomerUsername(String customerUsername);
    List<Parcel> findByDriverId(String driverId);
    List<Parcel> findByVendorUsername(String vendorUsername);
    List<Parcel> findByStatus(String status);
    List<Parcel> findByTrackingNumber(String trackingNumber);
}