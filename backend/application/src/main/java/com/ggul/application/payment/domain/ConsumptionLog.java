package com.ggul.application.payment.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.user.domain.User;
import com.ggul.application.wallet.domain.WalletHistory;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_history_id")
    private WalletHistory walletHistory;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "consumption_market")
    private String market;


    public static ConsumptionLog create(PaymentRequest paymentRequest, WalletHistory walletHistory, Integer newRequiredMoney, User user, ProductCategory productCategory) {
        return ConsumptionLog.builder()
                .balance(newRequiredMoney)
                .user(user)
                .market(paymentRequest.getMarket())
                .productName(paymentRequest.getProductName())
                .productCategory(productCategory)
                .walletHistory(walletHistory)
                .build();
    }
}
