package com.ggul.application.challange.ui.dto;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;
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

    public ChallengeParticipantView(ChallengeParticipant challengeParticipant) {
        if(challengeParticipant == null) {
            this.participantId = null;
            this.nickname = "탈퇴한 사용자";
            this.profileImg = null;
            this.type = null;
        }else {
            this.participantId = challengeParticipant.getId();
            this.nickname = challengeParticipant.getNickname();
            this.profileImg = challengeParticipant.getProfile();
            this.type = challengeParticipant.getType().getType();
        }
    }

    public void setIsMine(UUID sessionParticipantId) {
        isMine = Objects.equals(this.participantId, sessionParticipantId);
    }

    public void setIsMine(Boolean isMine) {
        this.isMine = isMine;
    }
}
