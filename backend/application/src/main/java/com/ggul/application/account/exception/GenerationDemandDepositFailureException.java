package com.ggul.application.account.exception;

import com.ggul.application.common.exception.CustomException;

public class GenerationDemandDepositFailureException extends CustomException {
    public GenerationDemandDepositFailureException(){
        super(AccountExceptionConstants.CREATE_DEMAND_DEPOSIT_FAILURE_EXCEPTION);
    }
}
