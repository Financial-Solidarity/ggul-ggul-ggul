package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentAlreadyOwnedException extends CustomException {
    public EquipmentAlreadyOwnedException() {
        super(EquipmentExceptionConstants.EQUIPMENT_ALREADY_OWNED);
    }
}
