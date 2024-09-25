package com.ggul.application.challange.ui.dto;

import com.ggul.application.challange.domain.ChallengeParticipantType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeParticipantView {
    private UUID participantId;
    private String nickname;
    private String profileImg;
    private ChallengeParticipantType.Type type;

    public ChallengeParticipantView(UUID participantId, String nickname, String profile, ChallengeParticipantType type) {
        this.participantId = participantId;
        this.nickname = nickname;
        this.profileImg = profile;
        this.type = type.getType();
    }
}
