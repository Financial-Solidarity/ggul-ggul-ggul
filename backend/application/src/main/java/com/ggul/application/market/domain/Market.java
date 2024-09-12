package com.ggul.application.market.domain;

import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.equipment.domain.Equipment;
import com.ggul.application.user.domain.User;
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
@Table(name = "market")
@Entity
public class Market extends SoftDeleteEntity {
    @Id
    @GeneratedValue
    @Column(name = "market_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    @ManyToOne
    @JoinColumn(name = "writer_id")
    private User writer;

    @Column(name = "market_title")
    private String title;

    @Column(name = "market_description")
    private String description;

    @Column(name = "market_cost")
    private Double cost;

}
