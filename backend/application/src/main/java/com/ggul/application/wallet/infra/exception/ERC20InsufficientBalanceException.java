package com.ggul.application.wallet.infra.exception;

public class ERC20InsufficientBalanceException extends RuntimeException{
    public ERC20InsufficientBalanceException(Exception e) {
        super(e);
    }
}
