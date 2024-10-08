package com.ggul.application.challange.exception;


import com.ggul.application.common.exception.CustomException;

public class ChallengeParticipantNotMatchException extends CustomException {
    public ChallengeParticipantNotMatchException() {
        super(ChallengeException.CHALLENGE_PARTICIPANT_NOT_MATCH);
    }
}
