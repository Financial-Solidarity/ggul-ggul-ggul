package com.ggul.application.backdoor.equipment.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentNFTMintRequestBD {
    private String email;
    private String tokenURI;
}
