package com.ggul.application.user.exception;

import com.ggul.application.common.exception.CustomException;

public class NicknameExistException extends CustomException {
    public NicknameExistException() {
        super(UserExceptionConstants.NICKNAME_EXIST_EXCEPTION);
    }
}
