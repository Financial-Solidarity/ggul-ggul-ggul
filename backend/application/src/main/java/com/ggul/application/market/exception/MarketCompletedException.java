package com.ggul.application.market.exception;

import com.ggul.application.common.exception.CustomException;

public class MarketCompletedException extends CustomException {
    public MarketCompletedException() {
        super(MarketExceptionConstants.MARKET_COMPLETED);
    }
}