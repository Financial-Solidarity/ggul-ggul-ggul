package com.ggul.application.market.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MarketExceptionConstants implements ErrorCodeDefinition {
    MARKET_NOT_FOUND("거래를 찾을 수 없습니다.", "M001",HttpStatus.NOT_FOUND),
    MARKET_CANCELED("취소된 거래입니다.", "M002", HttpStatus.BAD_REQUEST),
    MARKET_COMPLETED("완료된 거래입니다.", "M003", HttpStatus.BAD_REQUEST),
    MARKET_NOT_SELLER("판매자가 아닙니다.", "M004", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
