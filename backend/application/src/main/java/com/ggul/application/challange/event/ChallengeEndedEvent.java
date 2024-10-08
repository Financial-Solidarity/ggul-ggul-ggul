package com.ggul.application.challange.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class ChallengeEndedEvent {
    private UUID challengeId;
}
