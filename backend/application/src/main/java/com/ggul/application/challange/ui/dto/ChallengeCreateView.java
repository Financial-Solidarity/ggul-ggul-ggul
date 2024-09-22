package com.ggul.application.challange.ui.dto;

import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ChallengeCreateView {
    private UUID challengeId;
}
