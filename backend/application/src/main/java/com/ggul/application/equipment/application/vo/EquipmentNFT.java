package com.ggul.application.equipment.application.vo;

import com.ggul.application.equipment.domain.Equipment;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EquipmentNFT {
    private String publisher;
    private String transactionHash;
    private String adjective;
    private Long power;
    private Long item;

    public static EquipmentNFT of(Equipment equipment) {
        return EquipmentNFT.builder()
                .adjective(equipment.getAdjective())
                .publisher(equipment.getPublisher())
                .transactionHash(equipment.getTransactionHash())
                .power(equipment.getPower())
                .item(equipment.getItem().getId())
                .build();
    }
}
