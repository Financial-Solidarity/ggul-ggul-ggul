package com.ggul.application.payment.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    private Integer categoryId;
    private Integer spendGgulToken;
    private Integer requiredMoney;
    private String productName;
    private String market;
}
