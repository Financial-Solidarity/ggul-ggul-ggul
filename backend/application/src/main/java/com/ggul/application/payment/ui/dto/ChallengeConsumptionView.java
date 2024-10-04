package com.ggul.application.payment.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.payment.domain.ConsumptionLog;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeConsumptionView {
    private String productName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH-mm-ss")
    private LocalDateTime spentAt;
    private Integer money;
    private String label;
    private String market;
    private Integer spendGgulToken;
    private String nickname;
    private String team;
    private String profileImg;

    public ChallengeConsumptionView(ConsumptionLog consumptionLog, ChallengeParticipant challengeParticipant) {
        this.productName = consumptionLog.getProductName();
        this.spentAt = consumptionLog.getCreatedAt();
        this.money = consumptionLog.getBalance();
        this.label = consumptionLog.getProductCategory().getName();
    }
}
