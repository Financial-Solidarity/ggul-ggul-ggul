package com.ggul.application.challange.exception;

import com.ggul.application.common.exception.CustomException;

public class ChallengeParticipantNotExistException extends CustomException {
    public ChallengeParticipantNotExistException() {
        super(ChallengeException.CHALLENGE_PARTICIPANT_NOT_EXIST);
    }
}
