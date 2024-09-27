package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.CustomException;

public class ChallengeNotAuthorizedException extends CustomException {
    public ChallengeNotAuthorizedException() {
        super(ChallengeException.CHALLENGE_NOT_AUTHORIZED);
    }
}
