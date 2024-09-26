package com.ggul.application.challange.ui.dto;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.CompetitionType;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private Boolean isOwner;

    @Builder
    public ChallengeView(UUID challengeId, String title, Boolean isEncrypted, CompetitionType competitionType, Boolean isBlindness, Integer limitParticipant, Integer currentParticipant,Integer budgetCap, LocalDateTime startedAt, LocalDateTime endedAt, Boolean isOwner) {
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
    }



    public static ChallengeView from(Challenge challenge, Integer ) {
        return ChallengeView.builder()
                .challengeId(challenge.getId())
                .title(challenge.getTitle())
                .isEncrypted(challenge.getPasswordExist())
                .competitionType(challenge.getCompetitionType())
                .isBlindness(challenge.getIsBlindness())
                .limitParticipant(challenge.getLimitParticipant())
                .budgetCap(challenge.getBudgetCap())
                .startedAt(challenge.getStartedAt())
                .endedAt(challenge.getEndedAt())
                .build();
    }
}
