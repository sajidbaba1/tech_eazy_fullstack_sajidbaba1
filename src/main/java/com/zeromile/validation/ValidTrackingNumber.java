package com.zeromile.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TrackingNumberValidator.class)
@Documented
public @interface ValidTrackingNumber {
    String message() default "Invalid tracking number format";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
