package com.ggul.application.wallet.exception;

public class WalletGenerateFailException extends RuntimeException {
    public WalletGenerateFailException(Exception e){
        super("Cannot generate wallet", e);
    }
}
