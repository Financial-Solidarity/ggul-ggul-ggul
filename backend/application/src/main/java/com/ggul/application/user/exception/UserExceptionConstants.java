package com.ggul.application.user.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserExceptionConstants implements ErrorCodeDefinition {
    USER_EXIST_EXCEPTION("사용자가 이미 존재합니다.", "U002", HttpStatus.BAD_REQUEST),
    EMAIL_VERIFICATION_REQUEST_NOT_FOUND("이메일 인증 요청을 먼저 해주시기 바랍니다.", "U003", HttpStatus.BAD_REQUEST),
    EMAIL_VERIFICATION_NOT_FOUND("이메일 인증을 먼저 해주시기 바랍니다.", "U004", HttpStatus.BAD_REQUEST),
    NICKNAME_EXIST_EXCEPTION("닉네임이 이미 사용중입니다." , "U005", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
