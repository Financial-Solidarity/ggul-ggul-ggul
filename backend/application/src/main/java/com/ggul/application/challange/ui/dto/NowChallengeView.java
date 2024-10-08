package com.ggul.application.challange.ui.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NowChallengeView {
    private UUID challengeId;
    private String state;
}
