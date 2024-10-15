package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentNotFoundException extends CustomException {
    public EquipmentNotFoundException() {
        super(EquipmentExceptionConstants.EQUIPMENT_NOT_FOUND);
    }
}
