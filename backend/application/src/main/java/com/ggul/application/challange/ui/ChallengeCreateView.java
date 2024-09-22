package com.ggul.application.challange.ui;

import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ChallengeCreateView {
    private UUID roomId;
}
