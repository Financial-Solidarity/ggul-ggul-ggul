package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentSellingException extends CustomException {
    public EquipmentSellingException() {
        super(EquipmentExceptionConstants.EQUIPMENT_SELLING);
    }
}
