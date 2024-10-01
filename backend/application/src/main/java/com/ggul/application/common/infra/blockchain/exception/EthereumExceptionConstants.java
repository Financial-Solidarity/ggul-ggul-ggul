package com.ggul.application.common.infra.blockchain.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum EthereumExceptionConstants implements ErrorCodeDefinition {
    ETHEREUM_CALL_FAILURE("이더리움 요청에 실패했습니다.", "X899", HttpStatus.NOT_FOUND),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
