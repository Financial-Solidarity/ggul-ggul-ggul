package com.ggul.application.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private ErrorCodeDefinition errorCodeDefinition;
}
