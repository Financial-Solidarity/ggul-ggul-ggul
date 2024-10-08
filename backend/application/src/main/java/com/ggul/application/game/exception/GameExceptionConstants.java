package com.ggul.application.game.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GameExceptionConstants implements ErrorCodeDefinition {
    GAME_NOT_FOUND("게임 정보가 없습니다.", "G001",HttpStatus.NOT_FOUND),
    ;
    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
