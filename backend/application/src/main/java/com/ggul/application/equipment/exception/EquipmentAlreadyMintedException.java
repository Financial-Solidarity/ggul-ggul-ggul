package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentAlreadyMintedException extends CustomException {
    public EquipmentAlreadyMintedException() {
        super(EquipmentExceptionConstants.EQUIPMENT_ALREADY_MINTED);
    }
}
