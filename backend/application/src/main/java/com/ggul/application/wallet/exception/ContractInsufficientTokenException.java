package com.ggul.application.wallet.exception;

public class ContractInsufficientTokenException extends Exception {
    public ContractInsufficientTokenException(Exception e) {
        super("Insufficient tokens in contract", e);
    }
}
