package com.zeromile.controller;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors; // Added import

@RestController
@RequestMapping("/api/parcels")
public class ParcelController {
    @Autowired
    private ParcelService parcelService;

    @PostMapping
    public ResponseEntity<ParcelDTO> createParcel(@RequestBody ParcelDTO parcelDTO) {
        return ResponseEntity.ok(parcelService.createParcel(parcelDTO));
    }

    @GetMapping
    public ResponseEntity<List<ParcelDTO>> getAllParcels() {
        return ResponseEntity.ok(parcelService.getAllParcels());
    }

    @GetMapping("/{trackingId}")
    public ResponseEntity<ParcelDTO> getParcelByTrackingId(@PathVariable String trackingId) {
        ParcelDTO parcelDTO = parcelService.getParcelByTrackingId(trackingId);
        return parcelDTO != null ? ResponseEntity.ok(parcelDTO) : ResponseEntity.notFound().build();
    }

    @GetMapping("/group-by-area")
    public ResponseEntity<Map<String, List<ParcelDTO>>> groupParcelsByArea() {
        return ResponseEntity.ok(parcelService.groupParcelsByArea());
    }

    @PostMapping("/{parcelId}/assign-driver/{driverId}")
    public ResponseEntity<Void> assignDriver(@PathVariable Long parcelId, @PathVariable Long driverId) {
        parcelService.assignDriver(parcelId, driverId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report/daily")
    public ResponseEntity<List<ParcelDTO>> getDailyReport() {
        // Simplified: Return parcels with status "DELIVERED" or "FAILED"
        return ResponseEntity.ok(parcelService.getAllParcels().stream()
                .filter(p -> p.getStatus().equals("DELIVERED") || p.getStatus().equals("FAILED"))
                .collect(Collectors.toList()));
    }
}