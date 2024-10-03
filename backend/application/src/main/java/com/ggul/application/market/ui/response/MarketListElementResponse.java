package com.ggul.application.market.ui.response;

import com.ggul.application.market.application.dto.MarketListElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketListElementResponse {
    private UUID marketId;
    private Long power;
    private Long price;
    private Integer grade;
    private String title;
    private String imageUrl;

    public static MarketListElementResponse from(MarketListElement element){
        return MarketListElementResponse.builder()
                .marketId(element.getMarketId())
                .power(element.getPower())
                .price(element.getPrice())
                .grade((int) (element.getPower() / 200))
                .title(element.getTitle())
                .imageUrl(element.getImageUrl())
                .build();
    }
}
