package com.ggul.application.payment.ui.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ConsumptionView {
    private String category;
    private Integer balance;
}
