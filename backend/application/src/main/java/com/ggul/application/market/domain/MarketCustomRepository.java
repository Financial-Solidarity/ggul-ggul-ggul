package com.ggul.application.market.domain;

import com.ggul.application.market.application.dto.MarketSearchDto;
import com.ggul.application.market.application.dto.MarketListElement;
import org.springframework.data.domain.Slice;

public interface MarketCustomRepository{
    Slice<MarketListElement> findBySearchParameter(MarketSearchDto dto);
}
