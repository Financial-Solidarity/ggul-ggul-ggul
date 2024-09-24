package com.ggul.application.common.infra.blockchain;

import lombok.Getter;

@Getter
public class EthereumCall<T> {
    private final boolean isSuccess;
    private final T value;
    private final RuntimeException exception;

    private EthereumCall(boolean isSuccess, T value, RuntimeException exception) {
        this.isSuccess = isSuccess;
        this.value = value;
        this.exception = exception;
    }

    public static <T> EthereumCall<T> success(T value) {
        return new EthereumCall<>(true, value, null);
    }

    public static <T> EthereumCall<T> fail(RuntimeException exception) {
        return new EthereumCall<>(false, null, exception);
    }
}
