package com.ggul.application.challange.event;

import com.ggul.application.challange.domain.ChallengeParticipantType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class ChallengeParticipantChangedEvent {
    private UUID challengeId;
    private UUID participantId;
    private String nickname;
    private String profile;
    private Boolean isOwner;
    private ChallengeParticipantType type;
    private Boolean isDeleted;
    private Boolean isNew;
}
