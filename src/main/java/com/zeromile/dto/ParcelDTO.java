package com.zeromile.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParcelDTO {
    private Long id;
    private String trackingId;
    @NotNull(message = "Customer name is required")
    private String customerName;
    @NotNull(message = "Delivery address is required")
    private String deliveryAddress;
    @NotNull(message = "Contact number is required")
    private String contactNumber;
    @NotNull(message = "Parcel size is required")
    private String parcelSize;
    private double parcelWeight;
    private String status;
    @NotNull(message = "Delivery area is required")
    private String deliveryArea;
}