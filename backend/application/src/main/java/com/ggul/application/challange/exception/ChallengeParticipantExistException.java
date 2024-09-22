package com.ggul.application.challange.exception;

import com.ggul.application.common.exception.CustomException;

public class ChallengeParticipantExistException extends CustomException {
    public ChallengeParticipantExistException() {
        super(ChallengeException.CHALLENGE_PARTICIPANT_EXIST);
    }
}
