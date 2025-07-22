package com.zeromile.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "parcels")
@Data
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String trackingId;
    private String customerName;
    private String deliveryAddress;
    private String contactNumber;
    private String parcelSize;
    private Double parcelWeight;
    private String status;
    private String deliveryArea;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;
}