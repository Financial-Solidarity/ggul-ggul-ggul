package com.ggul.application.chatting.exception;

import com.ggul.application.common.exception.CustomException;

public class ChattingRoomParticipantNotExistException extends CustomException {
    public ChattingRoomParticipantNotExistException() {
        super(ChattingExceptionConstants.CHATTING_ROOM_PARTICIPANT_NOT_EXIST);
    }
}
