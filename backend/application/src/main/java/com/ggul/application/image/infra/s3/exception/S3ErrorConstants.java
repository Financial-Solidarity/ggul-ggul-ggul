package com.ggul.application.image.infra.s3.exception;

import com.ggul.application.common.exception.ErrorCodeDefinition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum S3ErrorConstants implements ErrorCodeDefinition {
    IMAGE_UPLOAD_FAIL("이미지 업로드 실패", "S001", HttpStatus.INTERNAL_SERVER_ERROR);
    private final String message;
    private final String statusCode;
    private final HttpStatus httpStatus;
}
