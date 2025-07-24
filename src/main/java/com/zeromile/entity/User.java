package com.zeromile.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")  // Ensure we use the 'users' table
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String role;
}
