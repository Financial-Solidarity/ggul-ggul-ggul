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
    EQUIPMENT_NOT_EQUIPPED("장착된 장비가 없습니다.", "E004", HttpStatus.NOT_FOUND),
    EQUIPMENT_UNAUTHORIZED("권한 없는 장비입니다.", "E005", HttpStatus.UNAUTHORIZED),
    EQUIPMENT_EQUIPPED("장착중인 장비입니다.","E006", HttpStatus.BAD_REQUEST),
    EQUIPMENT_SELLING("판매중인 장비입니다.", "E007", HttpStatus.BAD_REQUEST),
    EQUIPMENT_ALREADY_OWNED("이미 소유한 장비입니다.", "E008", HttpStatus.BAD_REQUEST),
    ;

    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
