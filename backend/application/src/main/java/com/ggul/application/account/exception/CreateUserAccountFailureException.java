package com.ggul.application.account.exception;

import com.ggul.application.common.exception.CustomException;

public class CreateUserAccountFailureException extends CustomException {
    public CreateUserAccountFailureException(){
        super(AccountExceptionConstants.USER_ACCOUNT_EXIST_EXCEPTION);
    }
}
