package com.zeromile.config;

import com.zeromile.exception.BusinessException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFound(EntityNotFoundException ex) {
        logger.error("Entity not found: {}", ex.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        return ResponseEntity.status(404).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
        logger.warn("Authentication failed: {}", ex.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(401).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
        logger.warn("Access denied: {}", ex.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Access denied");
        return ResponseEntity.status(403).body(response);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusinessException(BusinessException ex) {
        // Using MCP error pattern configuration
        if (ex.getMessage().contains("JWT") && ex.getMessage().contains("expired")) {
            logger.warn("JWT Token expired: {}", ex.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", ex.getMessage());
            response.put("action", "REDIRECT_TO_LOGIN");
            return ResponseEntity.status(401).body(response);
        }

        if (ex.getMessage().contains("Validation") && ex.getMessage().contains("failed")) {
            logger.warn("Validation error: {}", ex.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", ex.getMessage());
            response.put("action", "SHOW_USER_FEEDBACK");
            return ResponseEntity.status(400).body(response);
        }

        logger.error("Business error: {} (Code: {})", ex.getMessage(), ex.getErrorCode());
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        response.put("errorCode", ex.getErrorCode());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
            logger.warn("Validation error - {}: {}", fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralException(Exception ex) {
        logger.error("Unexpected error: {}", ex.getMessage(), ex);
        Map<String, String> response = new HashMap<>();
        response.put("message", "An unexpected error occurred");
        return ResponseEntity.status(500).body(response);
    }
}
