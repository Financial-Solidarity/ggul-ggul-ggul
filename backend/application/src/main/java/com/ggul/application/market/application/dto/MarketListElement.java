package com.ggul.application.market.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketListElement {
    private UUID marketId;
    private Long power;
    private Integer grade;
    private Long price;
    private String title;
    private String imageUrl;
}
