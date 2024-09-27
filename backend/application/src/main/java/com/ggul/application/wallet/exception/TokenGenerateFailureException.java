package com.ggul.application.wallet.exception;

public class TokenGenerateFailureException extends RuntimeException {
    public TokenGenerateFailureException(Exception e) {
        super("Cannot generate token", e);
    }
}
