package com.zeromile.controller;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.service.ParcelService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/parcels")
public class ParcelController {
    private static final Logger logger = LoggerFactory.getLogger(ParcelController.class);

    private final ParcelService parcelService;

    public ParcelController(ParcelService parcelService) {
        logger.info("Initializing ParcelController with ParcelService: {}", parcelService);
        this.parcelService = parcelService;
    }

    @PostMapping
    public ResponseEntity<ParcelDTO> createParcel(@Valid @RequestBody ParcelDTO parcelDTO) {
        logger.debug("Creating parcel: {}", parcelDTO);
        return ResponseEntity.ok(parcelService.createParcel(parcelDTO));
    }

    @GetMapping
    public ResponseEntity<List<ParcelDTO>> getAllParcels() {
        logger.debug("Fetching all parcels");
        return ResponseEntity.ok(parcelService.getAllParcels());
    }

    @GetMapping("/{trackingId}")
    public ResponseEntity<ParcelDTO> getParcelByTrackingId(@PathVariable String trackingId) {
        logger.debug("Fetching parcel with trackingId: {}", trackingId);
        ParcelDTO parcelDTO = parcelService.getParcelByTrackingId(trackingId);
        return parcelDTO != null ? ResponseEntity.ok(parcelDTO) : ResponseEntity.notFound().build();
    }

    @GetMapping("/group-by-area")
    public ResponseEntity<Map<String, List<ParcelDTO>>> groupParcelsByArea() {
        logger.debug("Grouping parcels by area");
        return ResponseEntity.ok(parcelService.groupParcelsByArea());
    }

    @PostMapping("/{parcelId}/assign-driver/{driverId}")
    public ResponseEntity<Void> assignDriver(@PathVariable Long parcelId, @PathVariable Long driverId) {
        logger.debug("Assigning driver {} to parcel {}", driverId, parcelId);
        parcelService.assignDriver(parcelId, driverId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report/daily")
    public ResponseEntity<List<ParcelDTO>> getDailyReport() {
        logger.debug("Fetching daily report");
        List<ParcelDTO> report = parcelService.getAllParcels().stream()
                .filter(p -> p.getStatus().equals("DELIVERED") || p.getStatus().equals("FAILED"))
                .collect(Collectors.toList());
        logger.debug("Daily report size: {}", report.size());
        return ResponseEntity.ok(report);
    }
}