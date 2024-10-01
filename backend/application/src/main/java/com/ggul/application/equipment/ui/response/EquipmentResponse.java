package com.ggul.application.equipment.ui.response;

import com.ggul.application.common.infra.blockchain.utils.BlockchainUrlGenerator;
import com.ggul.application.equipment.application.dto.EquipmentInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EquipmentResponse {
    private String adjective;

    private String name;
    private String imageUrl;

    private Long power;
    private Integer grade;

    private String transactionHash;
    private String transactionUrl;

    public static EquipmentResponse from(EquipmentInfo info){
        return EquipmentResponse.builder()
                .adjective(info.getAdjective())
                .name(info.getName())
                .imageUrl(info.getImageUrl())
                .power(info.getPower())
                .grade((int) (info.getPower()/200))
                .transactionHash(info.getTransactionHash())
                .transactionUrl(BlockchainUrlGenerator.logUrl(info.getTransactionHash()))
                .build();
    }
}
