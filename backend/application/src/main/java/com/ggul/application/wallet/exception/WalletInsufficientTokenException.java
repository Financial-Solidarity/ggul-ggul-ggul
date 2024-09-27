package com.ggul.application.wallet.exception;

public class WalletInsufficientTokenException extends Exception {
    public WalletInsufficientTokenException(Exception e) {
        super("Insufficient tokens in wallet", e);
    }
}