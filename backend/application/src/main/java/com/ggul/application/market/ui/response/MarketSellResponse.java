package com.ggul.application.market.ui.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class MarketSellResponse {
    private UUID marketId;
}
