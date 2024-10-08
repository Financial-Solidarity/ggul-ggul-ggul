package com.ggul.application.user.exception;

import com.ggul.application.common.exception.CustomException;

public class EmailVerificationNotFoundException extends CustomException {
    public EmailVerificationNotFoundException() {
        super(UserExceptionConstants.EMAIL_VERIFICATION_NOT_FOUND);
    }
}
