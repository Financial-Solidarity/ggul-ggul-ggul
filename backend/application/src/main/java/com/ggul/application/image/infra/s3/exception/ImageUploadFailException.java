package com.ggul.application.image.infra.s3.exception;

import com.ggul.application.common.exception.CustomException;

public class ImageUploadFailException extends CustomException {
    public ImageUploadFailException() {
        super(S3ErrorConstants.IMAGE_UPLOAD_FAIL);
    }
}
