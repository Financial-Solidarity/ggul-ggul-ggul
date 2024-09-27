package com.ggul.application.challange.exception;

import com.ggul.application.common.exception.CustomException;

public class ChallengeParticipantLimitException extends CustomException {
    public ChallengeParticipantLimitException() {
        super(ChallengeException.CHALLENGE_PARTICIPANT_LIMIT);
    }
}
