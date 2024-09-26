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
    private Boolean isMine;

    public ChallengeParticipantView(UUID participantId, String nickname, String profile, ChallengeParticipantType type) {
        this.participantId = participantId;
        this.nickname = nickname;
        this.profileImg = profile;
        this.type = type.getType();
    }

    public ChallengeParticipantView(UUID participantId, String nickname, String profile, ChallengeParticipantType type, Boolean isMine) {
        this.participantId = participantId;
        this.nickname = nickname;
        this.profileImg = profile;
        this.type = type.getType();
        this.isMine = isMine;
    }

    public void setIsMine(UUID sessionParticipantId) {
        isMine = participantId.equals(sessionParticipantId);
    }

    public void setIsMine(Boolean isMine) {
        this.isMine = isMine;
    }
}
