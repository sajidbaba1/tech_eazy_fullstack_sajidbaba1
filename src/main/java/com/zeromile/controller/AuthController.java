package com.zeromile.controller;

import com.zeromile.config.JwtUtil;
import com.zeromile.entity.User;
import com.zeromile.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost", "http://localhost:80", "http://localhost:3000"},
             allowCredentials = "true",
             maxAge = 3600,
             allowedHeaders = {"Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"},
             exposedHeaders = {"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Authorization"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Validate input
        if (username == null || password == null || username.trim().isEmpty() || password.trim().isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Username and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            String token = jwtUtil.generateToken(username, user.getRole());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", username);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid username or password");
            return ResponseEntity.status(401).body(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "An error occurred during authentication");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                String username = jwtUtil.getUsernameFromToken(token);
                if (username != null && jwtUtil.validateToken(token)) {
                    Map<String, String> response = new HashMap<>();
                    response.put("valid", "true");
                    return ResponseEntity.ok(response);
                }
            }
            return ResponseEntity.status(401).build();
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    // Debug endpoint to verify password hashing/matching
    @PostMapping("/test-password")
    public ResponseEntity<?> testPassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String rawPassword = body.get("password");

        Map<String, Object> resp = new HashMap<>();
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());

            resp.put("username", username);
            resp.put("matches", matches);
            resp.put("storedHash", user.getPassword());
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            resp.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(resp);
        }
    }
}