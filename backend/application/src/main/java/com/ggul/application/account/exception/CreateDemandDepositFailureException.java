package com.ggul.application.account.exception;

import com.ggul.application.common.exception.CustomException;

public class CreateDemandDepositFailureException extends CustomException {
    public CreateDemandDepositFailureException(){
        super(AccountExceptionConstants.CREATE_DEMAND_DEPOSIT_FAILURE_EXCEPTION);
    }
}
