package com.ggul.application.wallet.application.dto;

import com.ggul.application.wallet.domain.Category;
import com.ggul.application.wallet.domain.WalletHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WalletHistoryInfo {
    private Long quantity;
    private Category category;
    private LocalDateTime createdAt;

    public static WalletHistoryInfo from(WalletHistory history){
        return WalletHistoryInfo.builder()
                .quantity(history.getQuantity())
                .category(history.getCategory())
                .createdAt(history.getCreatedAt())
                .build();
    }
}
