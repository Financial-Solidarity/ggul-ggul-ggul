package com.ggul.application.payment.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.product.domain.ProductCategory;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consumption_log")
@Entity
@AttributeOverride(name = "createdAt", column = @Column(name = "consumption_at"))
public class ConsumptionLog extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "consumption_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id")
    private ProductCategory productCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "consumption_balance")
    private Integer balance;

    @Column(name = "consumption_title")
    private String title;

    @Column(name = "consumption_description")
    private String description;
}
