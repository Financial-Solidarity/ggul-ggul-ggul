package com.ggul.application.market.ui.request;

import com.ggul.application.market.application.dto.MarketSellDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MarketSellRequest {
    private String title;
    private String description;
    private Long price;
    private String ipfsCID;

    public MarketSellDto toDto(UUID userId){
        return MarketSellDto.builder()
                .userId(userId)
                .title(title)
                .description(description)
                .price(price)
                .ipfsCID(ipfsCID)
                .build();
    }
}
