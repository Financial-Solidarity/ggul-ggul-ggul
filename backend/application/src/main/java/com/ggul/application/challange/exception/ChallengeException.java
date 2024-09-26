package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ChallengeException implements ErrorCodeDefinition {
    CHALLENGE_NOT_FOUND("챌린지를 찾을 수 없습니다.", "C001", HttpStatus.BAD_REQUEST),
    CHALLENGE_PASSWORD_NOT_MATCH("챌린지 비밀번호가 맞지 않습니다", "C002", HttpStatus.BAD_REQUEST),
    CHALLENGE_IS_READY("챌린지가 시작 준비 완료 되었습니다.", "C003", HttpStatus.BAD_REQUEST),
    CHALLENGE_NOT_AUTHORIZED("챌린지 권한이 없습니다.", "C003", HttpStatus.BAD_REQUEST),
    CHALLENGE_PARTICIPANT_NOT_MATCH("챌린지 참가자 비율이 맞지 않습니다.", "CP001", HttpStatus.BAD_REQUEST),
    CHALLENGE_PARTICIPANT_NOT_EXIST("챌린지에 참석중이지 않습니다.", "CP002", HttpStatus.BAD_REQUEST),
    CHALLENGE_PARTICIPANT_EXIST("이미 챌린지에 참여중입니다.", "CP003", HttpStatus.BAD_REQUEST),
    CHALLENGE_PARTICIPANT_LIMIT("챌린지 참여자가 가득 찼습니다", "CP004", HttpStatus.BAD_REQUEST),

    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
