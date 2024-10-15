package com.ggul.application.application.exception;

import com.ggul.application.common.exception.CustomException;

public class ApplicationClosedException extends CustomException {
    public ApplicationClosedException() {
        super(ApplicationExceptionConstants.APPLICATION_CLOSED);
    }
}