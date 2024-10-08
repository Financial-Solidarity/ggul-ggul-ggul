package com.ggul.application.user.exception;

import com.ggul.application.common.exception.CustomException;

public class EmailVerificationRequestNotFoundException extends CustomException {
    public EmailVerificationRequestNotFoundException() {
        super(UserExceptionConstants.EMAIL_VERIFICATION_REQUEST_NOT_FOUND);
    }
}
