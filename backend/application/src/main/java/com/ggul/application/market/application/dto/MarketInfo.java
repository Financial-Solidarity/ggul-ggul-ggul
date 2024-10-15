package com.ggul.application.market.application.dto;

import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.market.domain.Market;
import com.ggul.application.market.domain.Status;
import com.ggul.application.user.ui.dto.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketInfo {

    private TokenizedEquipmentInfo equipmentNFT;

    private UserInfo seller;

    private UserInfo buyer;

    private String title;

    private String description;

    private Long price;

    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    private Status status;

    public static MarketInfo from(Market market) {
        return MarketInfo.builder()
                .seller(market.getSeller() != null ? UserInfo.from(market.getSeller()) : null)
                .buyer(market.getBuyer() != null ? UserInfo.from(market.getBuyer()) : null)
                .equipmentNFT(TokenizedEquipmentInfo.from(market.getTokenizedEquipment()))
                .title(market.getTitle())
                .description(market.getDescription())
                .price(market.getPrice())
                .createdAt(market.getCreatedAt())
                .completedAt(market.getCompletedAt())
                .status(market.getStatus())
                .build();
    }
}
