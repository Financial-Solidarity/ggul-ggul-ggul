package com.ggul.application.market.application.dto;

import com.ggul.application.market.domain.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketSearchDto {
    private UUID userId;
    private Long minPower;
    private Long maxPower;
    private Long minPrice;
    private Long maxPrice;
    private String name;
    private Boolean own;
    private Status status;
    private Pageable pageable;
}
