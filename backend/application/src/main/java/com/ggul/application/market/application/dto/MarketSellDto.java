package com.ggul.application.market.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketSellDto {
    private UUID userId;
    private String title;
    private String description;
    private Long price;
    private String ipfsCID;
}
