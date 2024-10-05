package com.ggul.application.application.exception;

import com.ggul.application.common.exception.CustomException;

public class ApplicationNotFoundException extends CustomException {
    public ApplicationNotFoundException() {
        super(ApplicationExceptionConstants.APPLICATION_NOT_FOUND);
    }
}