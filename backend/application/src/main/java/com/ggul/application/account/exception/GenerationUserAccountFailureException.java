package com.ggul.application.account.exception;

import com.ggul.application.common.exception.CustomException;

public class GenerationUserAccountFailureException extends CustomException {
    public GenerationUserAccountFailureException(){
        super(AccountExceptionConstants.USER_ACCOUNT_EXIST_EXCEPTION);
    }
}
