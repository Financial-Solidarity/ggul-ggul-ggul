package com.ggul.application.account.ui.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AccountDepositAndWithdrawView {
    private String accountNo;
    private Long transactionBalance;
    private String transactionSummary;
}
