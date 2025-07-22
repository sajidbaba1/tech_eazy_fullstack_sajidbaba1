package com.zeromile.service;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.entity.Driver;
import com.zeromile.entity.Parcel;
import com.zeromile.repository.DriverRepository;
import com.zeromile.repository.ParcelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ParcelService {
    private static final Logger logger = LoggerFactory.getLogger(ParcelService.class);

    private final ParcelRepository parcelRepository;
    private final DriverRepository driverRepository;

    public ParcelService(ParcelRepository parcelRepository, DriverRepository driverRepository) {
        logger.info("Initializing ParcelService with ParcelRepository: {} and DriverRepository: {}", parcelRepository, driverRepository);
        this.parcelRepository = parcelRepository;
        this.driverRepository = driverRepository;
    }

    public ParcelDTO createParcel(ParcelDTO parcelDTO) {
        logger.debug("Creating parcel for customer: {}", parcelDTO.getCustomerName());
        Parcel parcel = new Parcel();
        parcel.setTrackingId(UUID.randomUUID().toString());
        parcel.setCustomerName(parcelDTO.getCustomerName());
        parcel.setDeliveryAddress(parcelDTO.getDeliveryAddress());
        parcel.setContactNumber(parcelDTO.getContactNumber());
        parcel.setParcelSize(parcelDTO.getParcelSize());
        parcel.setParcelWeight(parcelDTO.getParcelWeight());
        parcel.setStatus("PENDING");
        parcel.setDeliveryArea(parcelDTO.getDeliveryArea());
        parcel = parcelRepository.save(parcel);
        return toParcelDTO(parcel);
    }

    public List<ParcelDTO> getAllParcels() {
        logger.debug("Fetching all parcels");
        List<ParcelDTO> parcels = parcelRepository.findAll().stream()
                .map(this::toParcelDTO)
                .collect(Collectors.toList());
        logger.debug("Retrieved {} parcels", parcels.size());
        return parcels;
    }

    public ParcelDTO getParcelByTrackingId(String trackingId) {
        logger.debug("Fetching parcel with trackingId: {}", trackingId);
        Parcel parcel = parcelRepository.findByTrackingId(trackingId);
        if (parcel == null) {
            logger.warn("Parcel not found for trackingId: {}", trackingId);
            return null;
        }
        return toParcelDTO(parcel);
    }

    public Map<String, List<ParcelDTO>> groupParcelsByArea() {
        logger.debug("Grouping parcels by delivery area");
        Map<String, List<ParcelDTO>> groupedParcels = parcelRepository.findAll().stream()
                .map(this::toParcelDTO)
                .collect(Collectors.groupingBy(ParcelDTO::getDeliveryArea));
        logger.debug("Grouped parcels into {} areas", groupedParcels.size());
        return groupedParcels;
    }

    public void assignDriver(Long parcelId, Long driverId) {
        logger.debug("Assigning driver {} to parcel {}", driverId, parcelId);
        Parcel parcel = parcelRepository.findById(parcelId)
                .orElseThrow(() -> {
                    logger.error("Parcel not found: {}", parcelId);
                    return new IllegalArgumentException("Parcel not found: " + parcelId);
                });
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> {
                    logger.error("Driver not found: {}", driverId);
                    return new IllegalArgumentException("Driver not found: " + driverId);
                });
        parcel.setDriver(driver);
        parcel.setStatus("ASSIGNED");
        parcelRepository.save(parcel);
        logger.info("Driver {} assigned to parcel {}", driverId, parcelId);
    }

    private ParcelDTO toParcelDTO(Parcel parcel) {
        ParcelDTO dto = new ParcelDTO();
        dto.setId(parcel.getId());
        dto.setTrackingId(parcel.getTrackingId());
        dto.setCustomerName(parcel.getCustomerName());
        dto.setDeliveryAddress(parcel.getDeliveryAddress());
        dto.setContactNumber(parcel.getContactNumber());
        dto.setParcelSize(parcel.getParcelSize());
        dto.setParcelWeight(parcel.getParcelWeight());
        dto.setStatus(parcel.getStatus());
        dto.setDeliveryArea(parcel.getDeliveryArea());
        return dto;
    }
}