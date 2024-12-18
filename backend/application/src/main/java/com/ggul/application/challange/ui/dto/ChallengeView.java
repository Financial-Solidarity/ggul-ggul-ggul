package com.ggul.application.challange.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.CompetitionType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;


@NoArgsConstructor
@Getter
@Setter

public class ChallengeView {
    private UUID challengeId;
    private String title;
    private Boolean isEncrypted;
    private String competitionType;
    private Boolean isBlindness;
    private Integer limitParticipant;
    private Integer currentParticipant;
    private Integer budgetCap;
    private Boolean isEnd;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime startAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime endAt;
    private Boolean isOwner;

    @Builder
    public ChallengeView(UUID challengeId, String title, Boolean isEncrypted, CompetitionType competitionType, Boolean isBlindness, Integer limitParticipant, Integer currentParticipant, Integer budgetCap, LocalDateTime startedAt, LocalDateTime endedAt, Boolean isOwner, Boolean isEnd) {
        this.challengeId = challengeId;
        this.title = title;
        this.isEncrypted = isEncrypted;
        this.competitionType = competitionType.getType().getValue();
        this.isBlindness = isBlindness;
        this.limitParticipant = limitParticipant;
        this.currentParticipant = currentParticipant;
        this.budgetCap = budgetCap;
        this.startAt = startedAt;
        this.endAt = endedAt;
        this.isOwner = isOwner;
        this.isEnd = isEnd;
    }

    public ChallengeView(UUID challengeId, String title, Boolean isEncrypted, CompetitionType competitionType, Boolean isBlindness, Integer limitParticipant, Long currentParticipant, Integer budgetCap, LocalDateTime startedAt, LocalDateTime endedAt, UUID challengeOwnerId, UUID sessionId, Boolean isEnded) {
        this.challengeId = challengeId;
        this.title = title;
        this.isEncrypted = isEncrypted;
        this.competitionType = competitionType.getType().getValue();
        this.isBlindness = isBlindness;
        this.limitParticipant = limitParticipant;
        this.currentParticipant = currentParticipant.intValue();
        this.budgetCap = budgetCap;
        this.startAt = startedAt;
        this.endAt = endedAt;
        this.isOwner = Objects.equals(challengeOwnerId, sessionId);
        this.isEnd = isEnded;
    }


    public static ChallengeView from(Challenge challenge, Integer currentParticipant, Boolean isOwner) {
        return ChallengeView.builder()
                .challengeId(challenge.getId())
                .title(challenge.getTitle())
                .isEncrypted(challenge.getPasswordExist())
                .competitionType(challenge.getCompetitionType())
                .isBlindness(challenge.getIsBlindness())
                .limitParticipant(challenge.getLimitParticipant())
                .currentParticipant(currentParticipant)
                .budgetCap(challenge.getBudgetCap())
                .startedAt(challenge.getStartedAt())
                .endedAt(challenge.getEndedAt())
                .isOwner(isOwner)
                .isEnd(challenge.getIsEnded())
                .build();
    }
}
