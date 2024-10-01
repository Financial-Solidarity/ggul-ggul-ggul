package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.CustomException;

public class WalletNotFoundException extends CustomException {
    public WalletNotFoundException() {
        super(WalletExceptionConstants.WALLET_NOT_FOUND);
    }
}
