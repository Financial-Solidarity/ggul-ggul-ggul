package com.ggul.application.challange.event;

import com.ggul.application.challange.domain.CompetitionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
public class ChallengeReadiedEvent {
    private UUID challengeId;
    private CompetitionType type;
    private UUID totalChattingRoomId;
    private UUID redTeamChattingRoomId;
    private UUID blueTeamChattingRoomId;
}
