package com.ggul.application.equipment.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EquipmentMintResult {
    private String transactionHash;
    private String ipfsCID;
    private String nftURI;
}
