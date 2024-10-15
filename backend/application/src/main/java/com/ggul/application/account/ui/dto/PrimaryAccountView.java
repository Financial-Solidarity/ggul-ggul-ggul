package com.ggul.application.account.ui.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PrimaryAccountView {
    private String accountNo;
    private String bankName;
    private Long accountBalance;
}
