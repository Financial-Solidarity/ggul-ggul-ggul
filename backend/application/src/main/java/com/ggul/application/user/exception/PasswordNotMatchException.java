package com.ggul.application.user.exception;

import com.ggul.application.common.exception.CustomException;

public class PasswordNotMatchException extends CustomException {
    public PasswordNotMatchException() {
        super(UserExceptionConstants.PASSWORD_NOT_MATCHED);
    }
}
