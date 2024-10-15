package com.ggul.application.application.exception;

import com.ggul.application.common.exception.CustomException;
import com.ggul.application.common.exception.ErrorCodeDefinition;

public class ApplicationProbabilityOutOfBoundsException extends CustomException {
    public ApplicationProbabilityOutOfBoundsException() {
        super(ApplicationExceptionConstants.APPLICATION_PROBABILITY_OUT_OF_BOUNDS);
    }
}
