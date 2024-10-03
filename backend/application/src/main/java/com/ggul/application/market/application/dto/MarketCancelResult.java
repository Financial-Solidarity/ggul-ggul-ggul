package com.ggul.application.market.application.dto;

import com.ggul.application.market.infra.MarketContract;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketCancelResult {
    private String transactionHash;
    private String sellerAddress;
    private Long dealNo;
    private Long price;
    private String ipfsCID;

    public static MarketCancelResult of(String transactionHash, MarketContract.MarketCancelResultEventResponse response){
        return MarketCancelResult.builder()
                .transactionHash(transactionHash)
                .sellerAddress(response.seller)
                .dealNo(response.dealNo.longValue())
                .price(response.price.longValue())
                .ipfsCID(response.ipfsCID)
                .build();
    }
}
