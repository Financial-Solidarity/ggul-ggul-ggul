package com.ggul.application.challange.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeTeamChangeRequest {
    private UUID participantId;
    private String targetTeam;
}
