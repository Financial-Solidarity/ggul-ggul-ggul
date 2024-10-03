package com.ggul.application.market.application.dto;

import com.ggul.application.market.infra.MarketContract;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketBuyResult {

    private String transactionHash;
    private String sellerAddress;
    private String buyerAddress;
    private BigInteger price;
    private String ipfsCID;

    public static MarketBuyResult of(String transactionHash, MarketContract.MarketBuyResultEventResponse response){
        return MarketBuyResult.builder()
                .transactionHash(transactionHash)
                .sellerAddress(response.seller)
                .buyerAddress(response.buyer)
                .price(response.price)
                .ipfsCID(response.ipfsCID)
                .build();
    }
}
