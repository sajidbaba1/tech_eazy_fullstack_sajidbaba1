package com.zeromile.service;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.entity.Driver;
import com.zeromile.entity.Parcel;
import com.zeromile.exception.BusinessException;
import com.zeromile.repository.DriverRepository;
import com.zeromile.repository.ParcelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParcelService {
    private static final Logger logger = LoggerFactory.getLogger(ParcelService.class);

    private final ParcelRepository parcelRepository;
    private final DriverRepository driverRepository;

    public ParcelService(ParcelRepository parcelRepository, DriverRepository driverRepository) {
        this.parcelRepository = parcelRepository;
        this.driverRepository = driverRepository;
    }

    public List<ParcelDTO> getAllParcels() {
        try {
            logger.debug("Fetching all parcels");
            return parcelRepository.findAll().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error retrieving all parcels", e);
            throw new BusinessException("Error retrieving parcels");
        }
    }

    public List<ParcelDTO> getParcelsByCustomer(String customerUsername) {
        try {
            logger.debug("Fetching parcels for customer: {}", customerUsername);
            return parcelRepository.findByCustomerUsername(customerUsername).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error retrieving parcels for customer: {}", customerUsername, e);
            throw new BusinessException("Error retrieving parcels for customer");
        }
    }

    public List<ParcelDTO> getParcelsByDriver(String driverId) {
        try {
            logger.debug("Fetching parcels for driver: {}", driverId);
            return parcelRepository.findByDriverId(driverId).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error retrieving parcels for driver: {}", driverId, e);
            throw new BusinessException("Error retrieving parcels for driver");
        }
    }

    public List<ParcelDTO> getParcelsByVendor(String vendorUsername) {
        try {
            logger.debug("Fetching parcels for vendor: {}", vendorUsername);
            return parcelRepository.findByVendorUsername(vendorUsername).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error retrieving parcels for vendor: {}", vendorUsername, e);
            throw new BusinessException("Error retrieving parcels for vendor");
        }
    }

    @Transactional
    public ParcelDTO createParcel(ParcelDTO parcelDTO) {
        try {
            Parcel parcel = new Parcel();
            parcel.setTrackingNumber(parcelDTO.getTrackingNumber());
            parcel.setCustomerUsername(parcelDTO.getCustomerUsername());
            parcel.setStatus("PENDING");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                parcel.setVendorUsername(auth.getName());
            }

            Parcel saved = parcelRepository.save(parcel);
            logger.info("Created new parcel with tracking number: {}", saved.getTrackingNumber());
            return convertToDTO(saved);
        } catch (Exception e) {
            logger.error("Error creating parcel", e);
            throw new BusinessException("Error creating parcel: " + e.getMessage());
        }
    }

    @Transactional
    public ParcelDTO assignDriver(Long parcelId, String driverId) {
        try {
            Parcel parcel = parcelRepository.findById(parcelId)
                    .orElseThrow(() -> new BusinessException("Parcel not found: " + parcelId));

            // First check if driver exists
            Driver driver = driverRepository.findById(Long.parseLong(driverId))
                    .orElseThrow(() -> new BusinessException("Driver not found: " + driverId));

            parcel.setDriverId(driverId);
            parcel.setStatus("ASSIGNED");

            Parcel updated = parcelRepository.save(parcel);
            logger.info("Assigned driver {} to parcel {}", driverId, parcelId);
            return convertToDTO(updated);
        } catch (NumberFormatException e) {
            logger.error("Invalid driver ID format: {}", driverId);
            throw new BusinessException("Invalid driver ID format: " + driverId);
        } catch (BusinessException e) {
            logger.error("Error in driver assignment: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error assigning driver to parcel", e);
            throw new BusinessException("Error assigning driver: " + e.getMessage());
        }
    }

    private ParcelDTO convertToDTO(Parcel parcel) {
        ParcelDTO dto = new ParcelDTO();
        dto.setId(parcel.getId());
        dto.setTrackingNumber(parcel.getTrackingNumber());
        dto.setCustomerUsername(parcel.getCustomerUsername());
        dto.setStatus(parcel.getStatus());
        dto.setDriverId(parcel.getDriverId());
        dto.setVendorUsername(parcel.getVendorUsername());
        dto.setCreatedAt(parcel.getCreatedAt());
        dto.setUpdatedAt(parcel.getUpdatedAt());
        return dto;
    }
}