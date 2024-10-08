package com.ggul.application.market.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MarketRepository extends JpaRepository<Market, UUID>, MarketCustomRepository {

    @Query("""
           SELECT m
           FROM Market m
           LEFT JOIN FETCH m.buyer
           LEFT JOIN FETCH m.seller
           LEFT JOIN FETCH m.tokenizedEquipment t
           LEFT JOIN FETCH t.equipment e
           LEFT JOIN FETCH e.item
           WHERE m.id = :marketId
           """)
    Optional<Market> findByIdUsingFetchAll(UUID marketId);
}
