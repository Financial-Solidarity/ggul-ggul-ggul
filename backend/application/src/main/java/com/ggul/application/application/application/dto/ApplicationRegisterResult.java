package com.ggul.application.application.application.dto;

import com.ggul.application.application.infra.ApplicationContract;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRegisterResult {
    private String transactionHash;
    private Long applicationNo;
    private Long maxWinnerCount;
    private Long probabilityNume;
    private Long probabilityDeno;
    private Long price;

    public static ApplicationRegisterResult of(String transactionHash, ApplicationContract.ApplicationRegisterResultEventResponse response){
        return ApplicationRegisterResult.builder()
                .transactionHash(transactionHash)
                .applicationNo(response.applicationNo.longValue())
                .maxWinnerCount(response.maxWinnerCount.longValue())
                .probabilityNume(response.probabilityNume.longValue())
                .probabilityDeno(response.probabilityDeno.longValue())
                .price(response.price.longValue())
                .build();
    }
}
