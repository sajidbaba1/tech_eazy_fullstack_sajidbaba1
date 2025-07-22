package com.zeromile.dto;

import lombok.Data;

@Data
public class ParcelDTO {
    private Long id;
    private String trackingId;
    private String customerName;
    private String deliveryAddress;
    private String contactNumber;
    private String parcelSize;
    private Double parcelWeight;
    private String status;
}