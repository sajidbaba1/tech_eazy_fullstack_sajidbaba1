package com.zeromile;

import com.zeromile.entity.User;
import com.zeromile.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ZeroMileDeliverySystemBackendApplication {
    private static final Logger logger = LoggerFactory.getLogger(ZeroMileDeliverySystemBackendApplication.class);

    public static void main(String[] args) {
        logger.info("Starting Zero Mile Delivery System backend");
        try {
            SpringApplication.run(ZeroMileDeliverySystemBackendApplication.class, args);
            logger.info("Backend started successfully");
        } catch (Exception e) {
            logger.error("Failed to start backend: {}", e.getMessage());
        }
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            logger.info("Seeding users");
            try {
                // Seed testuser (ADMIN)
                User adminUser = userRepository.findByUsername("testuser");
                if (adminUser == null) {
                    adminUser = new User();
                    adminUser.setUsername("testuser");
                    adminUser.setPassword(passwordEncoder.encode("testpass"));
                    adminUser.setRole("ADMIN");
                    userRepository.save(adminUser);
                    logger.info("Test user created: username=testuser, role=ADMIN");
                } else {
                    logger.info("Test user already exists: username=testuser, role={}", adminUser.getRole());
                }

                // Seed vendoruser (VENDOR)
                User vendorUser = userRepository.findByUsername("vendoruser");
                if (vendorUser == null) {
                    vendorUser = new User();
                    vendorUser.setUsername("vendoruser");
                    vendorUser.setPassword(passwordEncoder.encode("vendorpass"));
                    vendorUser.setRole("VENDOR");
                    userRepository.save(vendorUser);
                    logger.info("Vendor user created: username=vendoruser, role=VENDOR");
                } else {
                    logger.info("Vendor user already exists: username=vendoruser, role={}", vendorUser.getRole());
                }

                // Seed supervisoruser (SUPERVISOR)
                User supervisorUser = userRepository.findByUsername("supervisoruser");
                if (supervisorUser == null) {
                    supervisorUser = new User();
                    supervisorUser.setUsername("supervisoruser");
                    supervisorUser.setPassword(passwordEncoder.encode("supervisorpass"));
                    supervisorUser.setRole("SUPERVISOR");
                    userRepository.save(supervisorUser);
                    logger.info("Supervisor user created: username=supervisoruser, role=SUPERVISOR");
                } else {
                    logger.info("Supervisor user already exists: username=supervisoruser, role={}", supervisorUser.getRole());
                }
            } catch (Exception e) {
                logger.error("Failed to seed users: {}", e.getMessage());
            }
        };
    }
}