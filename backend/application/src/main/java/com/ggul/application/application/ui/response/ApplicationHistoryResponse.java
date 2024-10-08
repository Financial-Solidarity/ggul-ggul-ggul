package com.ggul.application.application.ui.response;

import com.ggul.application.application.application.dto.ApplicationHistoryInfo;
import com.ggul.application.application.application.dto.ApplicationInfo;
import com.ggul.application.common.infra.blockchain.util.BlockchainUrlGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationHistoryResponse {
    private String transactionHash;
    private String transactionUrl;
    private Boolean isSuccess;
    private Long nonce;
    private LocalDateTime createdAt;
    private ApplicationInfo application;

    public static ApplicationHistoryResponse from(ApplicationHistoryInfo info){
        return ApplicationHistoryResponse.builder()
                .transactionHash(info.getTransactionHash())
                .transactionUrl(BlockchainUrlGenerator.logUrl(info.getTransactionHash()))
                .isSuccess(info.getIsSuccess())
                .nonce(info.getNonce())
                .createdAt(info.getCreatedAt())
                .application(info.getApplicationInfo())
                .build();
    }
}
