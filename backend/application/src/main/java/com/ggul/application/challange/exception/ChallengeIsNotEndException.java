package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.CustomException;

public class ChallengeIsNotEndException extends CustomException {
    public ChallengeIsNotEndException() {
        super(ChallengeException.CHALLENGE_IS_NOT_END);
    }
}
