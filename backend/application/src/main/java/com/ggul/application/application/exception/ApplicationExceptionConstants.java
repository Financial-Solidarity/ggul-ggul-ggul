package com.ggul.application.application.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ApplicationExceptionConstants implements ErrorCodeDefinition {
    APPLICATION_PROBABILITY_OUT_OF_BOUNDS("응모 확률이 벗어납니다.", "AP001",HttpStatus.NOT_FOUND),
    APPLICATION_NOT_FOUND("응모를 찾을 수 없습니다.", "AP002", HttpStatus.NOT_FOUND),
    APPLICATION_WINNING_HISTORY_EXISTS("당첨 이력이 이미 존재합니다.", "AP003", HttpStatus.CONFLICT),
    APPLICATION_CLOSED("이미 종료된 응모입니다.", "AP004", HttpStatus.BAD_REQUEST),
    ;
    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
