package com.ggul.application.equipment.ui.response;

import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.equipment.domain.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenizedEquipmentResponse {
    private String ipfsCID;
    private String nftUrl;
    private Status status;
    private EquipmentResponse equipment;

    public static TokenizedEquipmentResponse from(TokenizedEquipmentInfo info) {
        return TokenizedEquipmentResponse.builder()
                .equipment(EquipmentResponse.from(info.getEquipment()))
                .ipfsCID(info.getIpfsCID())
                .nftUrl(info.getNftUrl())
                .status(info.getStatus())
                .build();
    }
}
