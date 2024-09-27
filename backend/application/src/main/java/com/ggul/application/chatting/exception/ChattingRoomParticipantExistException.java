package com.ggul.application.chatting.exception;

import com.ggul.application.common.exception.CustomException;
import com.ggul.application.common.exception.ErrorCodeDefinition;

public class ChattingRoomParticipantExistException extends CustomException {
    public ChattingRoomParticipantExistException() {
        super(ChattingExceptionConstants.CHATTING_ROOM_PARTICIPANT_EXIST);
    }
}
