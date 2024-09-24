package com.ggul.application.equipment.infra.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigInteger;

@Getter
@AllArgsConstructor
public class EquipmentDrawTransactionResult {
    private String transactionHash;
    private BigInteger power;
    private BigInteger item;
}
