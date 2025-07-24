package com.zeromile.entity;

import com.zeromile.validation.ValidTrackingNumber;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tracking number is required")
    @ValidTrackingNumber
    @Column(unique = true)
    private String trackingNumber;

    @NotBlank(message = "Customer username is required")
    private String customerUsername;

    private String vendorUsername;

    @NotBlank(message = "Status is required")
    private String status;

    private String driverId;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}