package com.ggul.application.chatting.exception;

import com.ggul.application.common.exception.CustomException;

public class ChattingJustificationUnAuthorizedException extends CustomException {
    public ChattingJustificationUnAuthorizedException() {
        super(ChattingExceptionConstants.CHATTING_JUSTIFICATION_UNAUTHORIZED);
    }
}
