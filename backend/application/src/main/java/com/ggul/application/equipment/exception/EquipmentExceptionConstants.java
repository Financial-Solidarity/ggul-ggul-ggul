package com.ggul.application.equipment.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum EquipmentExceptionConstants implements ErrorCodeDefinition {
    EQUIPMENT_NOT_FOUND("장비를 찾을 수 없습니다.", "E001",HttpStatus.NOT_FOUND),
    EQUIPMENT_ALREADY_MINTED("이미 존재하는 장비입니다.", "E002", HttpStatus.CONFLICT),
    EQUIPMENT_VALIDATION_FAILURE("장비 검증에 실패했습니다.", "E003", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
