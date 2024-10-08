package com.ggul.application.payment.event;

import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCompletedEvent {
    private UUID paymentId;
    private UUID userId;
    private Integer spendMoney;
    private String productName;
    private String market;
    private String categoryName;
}
