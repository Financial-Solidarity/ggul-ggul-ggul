package com.ggul.application.market.domain;

import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "market")
@Entity
public class Market {
    @Id
    @GeneratedValue
    @Column(name = "market_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "tokenized_equipment_id")
    private TokenizedEquipment tokenizedEquipment;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = Status.PENDING;
    }

    public void changeStatus(Status status) {
        this.status = status;
    }

    public void initCompletedAt(){
        this.completedAt = LocalDateTime.now();
    }
}
