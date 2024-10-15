package com.ggul.application.payment.ui.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionChartView {
    private String label;
    private Long money;
}
