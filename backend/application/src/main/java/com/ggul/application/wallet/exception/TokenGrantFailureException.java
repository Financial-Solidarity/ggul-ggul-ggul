package com.ggul.application.wallet.exception;

public class TokenGrantFailureException extends RuntimeException {
    public TokenGrantFailureException(Exception e) {
        super("Cannot grant token", e);
    }
}