package com.ggul.application.challange.ui.dto;

import com.ggul.application.challange.domain.Challenge;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ChallengeView {
    private UUID challengeId;
    private String title;
    private String password;
    private Boolean isEncrypted;
    private String competitionType;
    private Boolean isBlindness;
    private Integer limitParticipant;
    private Integer budgetCap;
    private LocalDate startDate;
    private LocalDate endDate;

    public static ChallengeView from(Challenge challenge) {
        return ChallengeView.builder()
                .challengeId(challenge.getId())
                .title(challenge.getTitle())
                .isEncrypted(challenge.getPasswordExist())
                .competitionType(challenge.getCompetitionType().getType().getValue())
                .isBlindness(challenge.getIsBlindness())
                .limitParticipant(challenge.getLimitParticipant())
                .budgetCap(challenge.getBudgeCap())
                .startDate(challenge.getStartedAt().toLocalDate())
                .endDate(challenge.getEndedAt().toLocalDate())
                .build();
    }
}
