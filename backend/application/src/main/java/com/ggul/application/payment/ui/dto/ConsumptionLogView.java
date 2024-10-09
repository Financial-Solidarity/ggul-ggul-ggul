package com.ggul.application.payment.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class ConsumptionLogView {
    private String productName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime spentAt;
    private Integer money;
    private String label;
    private String market;
    private Long spendGgulToken;

    @Builder
    public ConsumptionLogView(String productName, LocalDateTime spentAt, Integer money, String labe, String market, Long spendGgulToken) {
        this.productName = productName;
        this.spentAt = spentAt;
        this.money = money;
        this.label = labe;
        this.market = market;
        this.spendGgulToken = spendGgulToken;
        if(this.spendGgulToken == null) {
            this.spendGgulToken = 0L;
        }
    }
}
