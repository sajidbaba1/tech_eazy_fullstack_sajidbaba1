package com.zeromile.config;

import com.zeromile.entity.Parcel;
import com.zeromile.entity.User;
import com.zeromile.repository.ParcelRepository;
import com.zeromile.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    public CommandLineRunner initData(UserRepository userRepository,
                                    ParcelRepository parcelRepository,
                                    PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                // Initialize default users if they don't exist
                createUserIfNotExists(userRepository, "admin", "admin123", "ADMIN", passwordEncoder);
                createUserIfNotExists(userRepository, "customer", "customer123", "CUSTOMER", passwordEncoder);
                createUserIfNotExists(userRepository, "vendor", "vendor123", "VENDOR", passwordEncoder);
                createUserIfNotExists(userRepository, "supervisor", "supervisor123", "SUPERVISOR", passwordEncoder);

                // Initialize sample parcels if no parcels exist
                if (parcelRepository.count() == 0) {
                    logger.info("Initializing parcels...");
                    try {
                        LocalDateTime now = LocalDateTime.now();

                        Parcel parcel1 = new Parcel();
                        parcel1.setTrackingNumber("TRK001");
                        parcel1.setCustomerUsername("customer");
                        parcel1.setStatus("PENDING");
                        parcel1.setCreatedAt(now);
                        parcel1.setUpdatedAt(now);
                        parcelRepository.save(parcel1);

                        Parcel parcel2 = new Parcel();
                        parcel2.setTrackingNumber("TRK002");
                        parcel2.setCustomerUsername("customer");
                        parcel2.setStatus("PENDING");
                        parcel2.setCreatedAt(now);
                        parcel2.setUpdatedAt(now);
                        parcelRepository.save(parcel2);

                        logger.info("Parcels initialized successfully");
                    } catch (Exception e) {
                        logger.error("Error initializing parcels: {}", e.getMessage());
                    }
                } else {
                    logger.info("Parcels already exist, skipping initialization");
                }
            } catch (Exception e) {
                logger.error("Error during data initialization: {}", e.getMessage());
                // Don't rethrow the exception to allow the application to start
            }
        };
    }

    private void createUserIfNotExists(UserRepository userRepository,
                                     String username,
                                     String password,
                                     String role,
                                     PasswordEncoder passwordEncoder) {
        try {
            if (!userRepository.findByUsername(username).isPresent()) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode(password));
                user.setRole(role);
                userRepository.save(user);
                logger.info("Created {} user: {}", role, username);
            } else {
                logger.debug("User already exists: {}", username);
            }
        } catch (DataIntegrityViolationException e) {
            logger.warn("Attempted to create duplicate user {}: {}", username, e.getMessage());
        } catch (Exception e) {
            logger.error("Error creating user {}: {}", username, e.getMessage());
        }
    }
}
