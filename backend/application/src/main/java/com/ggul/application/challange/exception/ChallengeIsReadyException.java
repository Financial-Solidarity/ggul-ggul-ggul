package com.ggul.application.challange.exception;

import com.ggul.application.common.exception.CustomException;

public class ChallengeIsReadyException extends CustomException {
    public ChallengeIsReadyException() {
        super(ChallengeException.CHALLENGE_IS_READY);
    }
}
