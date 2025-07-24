package com.zeromile.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ParcelDTO {
    private Long id;
    private String trackingNumber;
    private String customerUsername;
    private String vendorUsername;
    private String status;
    private String driverId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}