package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.CustomException;

public class ChallengePasswordNotMatchException extends CustomException {
    public ChallengePasswordNotMatchException() {
        super(ChallengeException.CHALLENGE_PASSWORD_NOT_MATCH);
    }
}
