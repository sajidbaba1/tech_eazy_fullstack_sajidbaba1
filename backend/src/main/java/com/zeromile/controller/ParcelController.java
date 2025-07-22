package com.zeromile.controller;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}