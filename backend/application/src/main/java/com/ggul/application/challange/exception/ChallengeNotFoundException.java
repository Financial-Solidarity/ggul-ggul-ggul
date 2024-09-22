package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.CustomException;

public class ChallengeNotFoundException extends CustomException {
    public ChallengeNotFoundException() {
        super(ChallengeException.CHALLENGE_NOT_FOUND);
    }
}
