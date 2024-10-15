package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.CustomException;

public class TokenGenerateFailureException extends CustomException {
    public TokenGenerateFailureException() {
        super(WalletExceptionConstants.TOKEN_GENERATE_FAILURE);
    }
}
