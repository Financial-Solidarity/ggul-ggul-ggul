package com.ggul.application.common.infra.blockchain.exception;

import com.ggul.application.common.exception.CustomException;

public class EthereumCallFailureException extends CustomException {
    public EthereumCallFailureException() {
        super(EthereumExceptionConstants.ETHEREUM_CALL_FAILURE);
    }
}
