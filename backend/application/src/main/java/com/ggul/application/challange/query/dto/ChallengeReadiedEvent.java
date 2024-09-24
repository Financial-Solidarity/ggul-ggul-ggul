package com.ggul.application.challange.query.dto;

import com.ggul.application.challange.domain.CompetitionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class ChallengeReadiedEvent {
    private UUID challengeId;
    private CompetitionType type;
    private UUID totalChattingRoomId;
    private UUID redTeamChattingRoomId;
    private UUID blueTeamChattingRoomId;
}
