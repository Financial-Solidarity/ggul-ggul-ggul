package com.ggul.application.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public interface ErrorCodeDefinition {
    String getMessage();
    String getStatusCode();
    HttpStatus getHttpStatus();

    default ResponseEntity<?> toErrorResponseEntity() {
        ErrorResponse errors = ErrorResponse.builder()
                .message(getMessage())
                .status(getStatusCode())
                .build();
        return new ResponseEntity<>(errors, getHttpStatus());
    }
}
