package com.ggul.application.user.exception;

import com.ggul.application.common.exception.CustomException;

public class UserExistException extends CustomException {
    public UserExistException() {
        super(UserExceptionConstants.USER_EXIST_EXCEPTION);
    }
}
