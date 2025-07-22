package com.zeromile.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class TrackingNumberValidator implements ConstraintValidator<ValidTrackingNumber, String> {
    private static final Pattern TRACKING_NUMBER_PATTERN = Pattern.compile("^TRK[0-9]{3,6}$");

    @Override
    public void initialize(ValidTrackingNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        return TRACKING_NUMBER_PATTERN.matcher(value).matches();
    }
}
