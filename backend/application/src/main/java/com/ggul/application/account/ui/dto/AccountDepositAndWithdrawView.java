package com.ggul.application.account.ui.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountDepositAndWithdrawView {
    private String accountNo;
    private Long transactionBalance;
    private String transactionSummary;
}
