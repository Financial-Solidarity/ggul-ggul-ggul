package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.CustomException;

public class EquipmentValidationFailureException extends CustomException {
    public EquipmentValidationFailureException() {
        super(EquipmentExceptionConstants.EQUIPMENT_VALIDATION_FAILURE);
    }
}