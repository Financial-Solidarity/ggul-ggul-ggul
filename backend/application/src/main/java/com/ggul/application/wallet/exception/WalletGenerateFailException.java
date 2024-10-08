package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.CustomException;

public class WalletGenerateFailException extends CustomException {
    public WalletGenerateFailException(){
        super(WalletExceptionConstants.WALLET_GENERATE_FAILURE);
    }
}
