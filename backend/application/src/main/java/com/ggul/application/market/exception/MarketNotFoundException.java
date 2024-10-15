package com.ggul.application.market.exception;

import com.ggul.application.common.exception.CustomException;

public class MarketNotFoundException extends CustomException {
    public MarketNotFoundException(){
        super(MarketExceptionConstants.MARKET_NOT_FOUND);
    }
}
