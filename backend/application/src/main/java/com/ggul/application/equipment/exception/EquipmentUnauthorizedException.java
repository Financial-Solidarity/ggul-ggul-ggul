package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentUnauthorizedException extends CustomException {
    public EquipmentUnauthorizedException() {
        super(EquipmentExceptionConstants.EQUIPMENT_UNAUTHORIZED);
    }
}