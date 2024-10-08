package com.ggul.application.application.application.dto;

import com.ggul.application.application.infra.ApplicationContract;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationApplyResult {
    private String transactionHash;
    private String player;
    private Long nonce;
    private Long target;
    private Boolean isSuccess;
    private Long remainingWinnerCount;

    public static ApplicationApplyResult of(String transactionHash, ApplicationContract.EnterResultEventResponse response){
        return ApplicationApplyResult.builder()
                .transactionHash(transactionHash)
                .player(response.player)
                .nonce(response.nonce.longValue())
                .target(response.target.longValue())
                .isSuccess(response.isSuccess)
                .remainingWinnerCount(response.remainingWinnerCount.longValue())
                .build();
    }
}
