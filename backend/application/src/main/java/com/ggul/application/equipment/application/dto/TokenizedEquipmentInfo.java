package com.ggul.application.equipment.application.dto;

import com.ggul.application.equipment.domain.Status;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenizedEquipmentInfo {
    private String ipfsCID;
    private String nftUrl;
    private Status status;
    private EquipmentInfo equipment;

    public static TokenizedEquipmentInfo from(TokenizedEquipment tokenizedEquipment){
        return TokenizedEquipmentInfo.builder()
                .ipfsCID(tokenizedEquipment.getIpfsCID())
                .nftUrl(tokenizedEquipment.getNftUrl())
                .status(tokenizedEquipment.getStatus())
                .equipment(EquipmentInfo.from(tokenizedEquipment.getEquipment()))
                .build();
    }
}
