package com.zeromile.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "drivers")
@Data
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String vehicleType;
}