package com.zeromile.service;

import com.zeromile.dto.ParcelDTO;
import com.zeromile.entity.Parcel;
import com.zeromile.repository.ParcelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ParcelService {
    @Autowired
    private ParcelRepository parcelRepository;

    public ParcelDTO createParcel(ParcelDTO parcelDTO) {
        Parcel parcel = new Parcel();
        parcel.setTrackingId(UUID.randomUUID().toString());
        parcel.setCustomerName(parcelDTO.getCustomerName());
        parcel.setDeliveryAddress(parcelDTO.getDeliveryAddress());
        parcel.setContactNumber(parcelDTO.getContactNumber());
        parcel.setParcelSize(parcelDTO.getParcelSize());
        parcel.setParcelWeight(parcelDTO.getParcelWeight());
        parcel.setStatus("PENDING");
        parcel = parcelRepository.save(parcel);
        parcelDTO.setId(parcel.getId());
        parcelDTO.setTrackingId(parcel.getTrackingId());
        return parcelDTO;
    }

    public List<ParcelDTO> getAllParcels() {
        return parcelRepository.findAll().stream()
                .map(parcel -> {
                    ParcelDTO dto = new ParcelDTO();
                    dto.setId(parcel.getId());
                    dto.setTrackingId(parcel.getTrackingId());
                    dto.setCustomerName(parcel.getCustomerName());
                    dto.setDeliveryAddress(parcel.getDeliveryAddress());
                    dto.setContactNumber(parcel.getContactNumber());
                    dto.setParcelSize(parcel.getParcelSize());
                    dto.setParcelWeight(parcel.getParcelWeight());
                    dto.setStatus(parcel.getStatus());
                    return dto;
                }).collect(Collectors.toList());
    }

    public ParcelDTO getParcelByTrackingId(String trackingId) {
        Parcel parcel = parcelRepository.findByTrackingId(trackingId);
        if (parcel == null) return null;
        ParcelDTO dto = new ParcelDTO();
        dto.setId(parcel.getId());
        dto.setTrackingId(parcel.getTrackingId());
        dto.setCustomerName(parcel.getCustomerName());
        dto.setDeliveryAddress(parcel.getDeliveryAddress());
        dto.setContactNumber(parcel.getContactNumber());
        dto.setParcelSize(parcel.getParcelSize());
        dto.setParcelWeight(parcel.getParcelWeight());
        dto.setStatus(parcel.getStatus());
        return dto;
    }
}