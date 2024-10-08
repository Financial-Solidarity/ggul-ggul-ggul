package com.ggul.application.account.exception;

import com.ggul.application.common.exception.CustomException;

public class NotEnoughMoneyException extends CustomException {
    public NotEnoughMoneyException(){super(AccountExceptionConstants.NOT_ENOUGH_MONEY_EXCEPTION);}
}
