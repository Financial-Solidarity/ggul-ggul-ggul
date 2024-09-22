package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ChallengeException implements ErrorCodeDefinition {
    CHALLENGE_NOT_FOUND("챌린지를 찾을 수 없습니다.", "C001", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
