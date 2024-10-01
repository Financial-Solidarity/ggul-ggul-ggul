package com.ggul.application.chatting.exception;

import com.ggul.application.common.exception.CustomException;

public class ChattingNotFoundException extends CustomException {
    public ChattingNotFoundException() {
        super(ChattingExceptionConstants.CHATTING_NOT_FOUND);
    }
}
