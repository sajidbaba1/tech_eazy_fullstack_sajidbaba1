package com.zeromile.controller;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.service.ParcelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = {"http://localhost", "http://localhost:80", "http://localhost:3000"},
             allowCredentials = "true",
             exposedHeaders = "Authorization")
public class ParcelController {
    private static final Logger logger = LoggerFactory.getLogger(ParcelController.class);
    private final ParcelService parcelService;

    public ParcelController(ParcelService parcelService) {
        this.parcelService = parcelService;
    }

    @GetMapping
    public ResponseEntity<Object> getParcels() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = ((UserDetails) authentication.getPrincipal()).getUsername();
            String role = authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

            logger.debug("Getting parcels for user: {} with role: {}", username, role);

            List<ParcelDTO> parcels;
            switch (role) {
                case "CUSTOMER":
                    parcels = parcelService.getParcelsByCustomer(username);
                    break;
                case "DRIVER":
                    parcels = parcelService.getParcelsByDriver(username);
                    break;
                case "VENDOR":
                    parcels = parcelService.getParcelsByVendor(username);
                    break;
                case "ADMIN":
                case "SUPERVISOR":
                    parcels = parcelService.getAllParcels();
                    break;
                default:
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Invalid role");
                    return ResponseEntity.status(403).body(response);
            }

            if (parcels.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "No parcels found");
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok(parcels);
        } catch (Exception e) {
            logger.error("Error getting parcels: {}", e.getMessage(), e);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error loading parcels. Please try again.");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createParcel(@RequestBody ParcelDTO parcelDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

            logger.debug("Creating parcel with role: {}", role);

            if (!"VENDOR".equals(role) && !"ADMIN".equals(role)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Only vendors and admins can create parcels");
                return ResponseEntity.status(403).body(response);
            }

            if (parcelDTO.getTrackingNumber() == null || parcelDTO.getCustomerUsername() == null) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Tracking number and customer username are required");
                return ResponseEntity.badRequest().body(response);
            }

            ParcelDTO created = parcelService.createParcel(parcelDTO);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            logger.error("Error creating parcel: {}", e.getMessage(), e);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error creating parcel: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/assign")
    public ResponseEntity<?> assignDriver(@RequestParam Long parcelId, @RequestParam String driverId) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

            logger.debug("Assigning driver with role: {}", role);

            if (!"ADMIN".equals(role) && !"SUPERVISOR".equals(role)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Only admins and supervisors can assign drivers");
                return ResponseEntity.status(403).body(response);
            }

            ParcelDTO updated = parcelService.assignDriver(parcelId, driverId);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            logger.error("Error assigning driver: {}", e.getMessage(), e);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error assigning driver: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}