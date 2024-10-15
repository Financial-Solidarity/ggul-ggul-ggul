package com.ggul.application.equipment.application.dto;

import com.ggul.application.equipment.domain.Equipment;
import com.ggul.application.equipment.domain.EquipmentItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EquipmentInfo {
    private String adjective;

    private String name;
    private String imageUrl;

    private String publisher;
    private Long power;
    private Integer grade;

    private String transactionHash;
    private Boolean minted;

    public static EquipmentInfo from(Equipment equipment) {
        EquipmentItem item = equipment.getItem();
        return EquipmentInfo.builder()
                .adjective(equipment.getAdjective())
                .publisher(equipment.getPublisher())
                .power(equipment.getPower())
                .grade((int) (equipment.getPower()/200))
                .transactionHash(equipment.getTransactionHash())
                .minted(equipment.getMinted())
                .name(item.getName())
                .imageUrl(item.getUrl())
                .build();
    }
}
