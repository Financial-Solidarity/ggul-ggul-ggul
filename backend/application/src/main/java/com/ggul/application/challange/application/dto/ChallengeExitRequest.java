package com.ggul.application.challange.application.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeExitRequest {
    private UUID challengeId;
}
