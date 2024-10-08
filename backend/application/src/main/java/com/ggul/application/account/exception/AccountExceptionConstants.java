package com.ggul.application.account.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum AccountExceptionConstants implements ErrorCodeDefinition {
    USER_ACCOUNT_EXIST_EXCEPTION("이미 존재하는 계정입니다.", "A001", HttpStatus.BAD_REQUEST),
    CREATE_DEMAND_DEPOSIT_FAILURE_EXCEPTION("상품 등록에 실패했습니다.", "A002", HttpStatus.BAD_REQUEST),
    NOT_ENOUGH_MONEY_EXCEPTION("잔고가 부족합니다.", "A003", HttpStatus.BAD_REQUEST);

    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}