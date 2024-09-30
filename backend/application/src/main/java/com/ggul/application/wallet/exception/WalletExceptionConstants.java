package com.ggul.application.wallet.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum WalletExceptionConstants implements ErrorCodeDefinition {
    WALLET_NOT_FOUND("지갑이 존재하지 않습니다.", "W001", HttpStatus.NOT_FOUND),
    WALLET_INSUFFICIENT_TOKEN("지갑에 토큰이 부족합니다.", "W002", HttpStatus.BAD_REQUEST),
    TOKEN_GENERATE_FAILURE("토큰 발행에 실패했습니다.", "W003", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN_GRANT_FAILURE("토큰 지급에 실패했습니다.", "W004", HttpStatus.INTERNAL_SERVER_ERROR),
    WALLET_GENERATE_FAILURE("지갑 생성에 실패했습니다.", "W005", HttpStatus.INTERNAL_SERVER_ERROR),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
