package com.ggul.application.market.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MarketDealRepository extends JpaRepository<MarketDeal, UUID> {
    Optional<MarketDeal> findByMarket(Market market);
}
