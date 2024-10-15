package com.ggul.application.application.ui.response;

import com.ggul.application.application.application.dto.ApplicationApplyResult;
import com.ggul.application.common.infra.blockchain.util.BlockchainUrlGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationApplyResultResponse {
    private String transactionHash;
    private String transactionUrl;
    private String player;
    private Long nonce;
    private Long target;
    private Boolean isSuccess;
    private Long remainingWinnerCount;

    public static ApplicationApplyResultResponse from(ApplicationApplyResult result){
        return ApplicationApplyResultResponse.builder()
                .transactionHash(result.getTransactionHash())
                .transactionUrl(BlockchainUrlGenerator.logUrl(result.getTransactionHash()))
                .player(result.getPlayer())
                .nonce(result.getNonce())
                .target(result.getTarget())
                .isSuccess(result.getIsSuccess())
                .remainingWinnerCount(result.getRemainingWinnerCount())
                .build();
    }
}
