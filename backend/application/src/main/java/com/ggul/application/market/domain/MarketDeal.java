package com.ggul.application.market.domain;

import com.ggul.application.common.jpa.domain.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "market_deal")
@Entity
public class MarketDeal {
    @Id
    @GeneratedValue
    @Column(name = "market_deal_id")
    @UUIDv7
    private UUID id;

    @OneToOne
    @JoinColumn(name = "market_id")
    private Market market;

    @Column(name = "deal_no")
    private Long dealNo;
}
