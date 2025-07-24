package com.zeromile.config;

import com.zeromile.entity.User;
import com.zeromile.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create test users if they don't exist
        createUserIfNotExists("testuser", "password123", "CUSTOMER");
        createUserIfNotExists("admin", "password123", "ADMIN");
        createUserIfNotExists("vendor", "password123", "VENDOR");
        createUserIfNotExists("driver", "password123", "DRIVER");
    }

    private void createUserIfNotExists(String username, String password, String role) {
        userRepository.findByUsername(username).ifPresentOrElse(existing -> {
            if (!passwordEncoder.matches(password, existing.getPassword())) {
                existing.setPassword(passwordEncoder.encode(password));
                existing.setRole(role); // Ensure role is correct
                userRepository.save(existing);
                logger.info("Updated password and role for existing user: {}", username);
            } else {
                logger.debug("User already exists with matching password: {}", username);
            }
        }, () -> {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
            logger.info("Created {} user: {}", role, username);
        });
    }
}
