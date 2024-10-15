package com.ggul.application.market.exception;

import com.ggul.application.common.exception.CustomException;

public class MarketCanceledException extends CustomException {
    public MarketCanceledException() {
        super(MarketExceptionConstants.MARKET_CANCELED);
    }
}