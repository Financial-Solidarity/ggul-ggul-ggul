package com.ggul.application.common.infra.blockchain;

public class EthereumCallExceptionHandler {

    public static <T> T handleException(EthereumCall<T> ec) {
        if (ec.isSuccess())
            return ec.getValue();
        throw ec.getException();
    }
}
