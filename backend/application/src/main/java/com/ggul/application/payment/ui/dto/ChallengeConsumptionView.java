package com.ggul.application.payment.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.ProductCategory;
import com.ggul.application.wallet.domain.WalletHistory;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class ChallengeConsumptionView {
    private String productName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH-mm-ss")
    private LocalDateTime spentAt;
    private Integer money;
    private String label;
    private String market;
    private Long spendGgulToken;
    private String nickname;
    private String team;
    private String profileImg;

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
    }
}
