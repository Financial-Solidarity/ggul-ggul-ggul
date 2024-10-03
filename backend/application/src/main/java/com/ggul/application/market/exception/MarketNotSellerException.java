package com.ggul.application.market.exception;

import com.ggul.application.common.exception.CustomException;

public class MarketNotSellerException extends CustomException {
    public MarketNotSellerException(){
        super(MarketExceptionConstants.MARKET_NOT_SELLER);
    }
}