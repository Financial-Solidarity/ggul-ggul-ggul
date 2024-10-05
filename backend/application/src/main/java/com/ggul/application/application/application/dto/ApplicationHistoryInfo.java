package com.ggul.application.application.application.dto;

import com.ggul.application.application.domain.ApplicationHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationHistoryInfo {
    private String transactionHash;
    private Boolean isSuccess;
    private Long nonce;
    private LocalDateTime createdAt;
    private ApplicationInfo applicationInfo;

    public static ApplicationHistoryInfo from(ApplicationHistory history){
        return ApplicationHistoryInfo.builder()
                .transactionHash(history.getTransactionHash())
                .isSuccess(history.getIsSuccess())
                .nonce(history.getNonce())
                .createdAt(history.getCreatedAt())
                .applicationInfo(ApplicationInfo.from(history.getApplication()))
                .build();
    }
}
