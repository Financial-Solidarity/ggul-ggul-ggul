package com.ggul.application.chatting.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
@AllArgsConstructor
public enum ChattingExceptionConstants implements ErrorCodeDefinition {
    CHATTING_ROOM_NOT_FOUND("채팅방을 찾을 수 없습니다", "C001", HttpStatus.BAD_REQUEST),


    CHATTING_ROOM_PARTICIPANT_NOT_BALANCED("참가자의 비율이 맞지 않습니다", "CP001", HttpStatus.BAD_REQUEST),
    CHATTING_ROOM_PARTICIPANT_EXIST("이미 참가한 방입니다.", "CP002", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;

}
