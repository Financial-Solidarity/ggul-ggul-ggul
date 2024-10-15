package com.ggul.application.application.exception;

import com.ggul.application.common.exception.CustomException;

public class ApplicationWinningHistoryExistsException extends CustomException {
    public ApplicationWinningHistoryExistsException() {
        super(ApplicationExceptionConstants.APPLICATION_WINNING_HISTORY_EXISTS);
    }
}