package com.ggul.application.payment.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.ProductCategory;
import com.ggul.application.wallet.domain.WalletHistory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Setter
@NoArgsConstructor
public class ChallengeConsumptionView {
    @Getter
    private String productName;
    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH-mm-ss")
    private LocalDateTime spentAt;
    @Getter
    private Integer money;
    @Getter
    private String label;
    @Getter
    private String market;
    @Getter
    private Long spendGgulToken;
    @Getter
    private String nickname;
    @Getter
    private String team;
    @Getter
    private String profileImg;
    @Getter
    private Boolean isMine;

    private UUID challengeParticipantId;

    @Builder
    public ChallengeConsumptionView(ConsumptionLog consumptionLog, ChallengeParticipant challengeParticipant, ProductCategory category, WalletHistory walletHistory) {
        this.productName = consumptionLog.getProductName();
        this.spentAt = consumptionLog.getCreatedAt();
        this.money = consumptionLog.getBalance();
        this.label = category.getName();
        this.market = consumptionLog.getMarket();
        this.spendGgulToken = walletHistory == null ? 0 : walletHistory.getQuantity();
        this.nickname = challengeParticipant.getNickname();
        this.profileImg = challengeParticipant.getProfile();
        this.team = challengeParticipant.getType().getType().name();
        this.challengeParticipantId = challengeParticipant.getId();
    }

    public void setIsMine(UUID challengeParticipantId) {
        this.isMine = Objects.equals(challengeParticipantId, this.challengeParticipantId);
    }
}
