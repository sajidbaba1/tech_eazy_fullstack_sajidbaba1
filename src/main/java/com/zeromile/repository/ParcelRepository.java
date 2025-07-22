package com.zeromile.repository;

import com.zeromile.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {
    Parcel findByTrackingId(String trackingId);
}