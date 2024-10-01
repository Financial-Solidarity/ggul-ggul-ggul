package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentNotEquippedException extends CustomException {
    public EquipmentNotEquippedException() {
        super(EquipmentExceptionConstants.EQUIPMENT_NOT_EQUIPPED);
    }
}
