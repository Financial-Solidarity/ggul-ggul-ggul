package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentEquippedException extends CustomException {
    public EquipmentEquippedException() {
        super(EquipmentExceptionConstants.EQUIPMENT_EQUIPPED);
    }
}
