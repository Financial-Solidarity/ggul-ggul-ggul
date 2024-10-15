package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.CustomException;

public class WalletInsufficientTokenException extends CustomException {
    public WalletInsufficientTokenException() {
        super(WalletExceptionConstants.WALLET_INSUFFICIENT_TOKEN);
    }
}