package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.CustomException;

public class TokenGrantFailureException extends CustomException {
    public TokenGrantFailureException() {
        super(WalletExceptionConstants.TOKEN_GRANT_FAILURE);
    }
}