package com.ggul.application.equipment.application.dto;

import com.ggul.application.equipment.infra.EquipmentDrawContract;
import lombok.Builder;
import lombok.Getter;

import java.math.BigInteger;

@Getter
@Builder
public class EquipmentDrawResult {
    private String transactionHash;
    private String publisher;
    private BigInteger power;
    private BigInteger item;

    public static EquipmentDrawResult of(String transactionHash, EquipmentDrawContract.DrawResultEventResponse response){
        return EquipmentDrawResult.builder()
                .transactionHash(transactionHash)
                .publisher(response.player)
                .power(response.power)
                .item(response.item)
                .build();
    }
}
