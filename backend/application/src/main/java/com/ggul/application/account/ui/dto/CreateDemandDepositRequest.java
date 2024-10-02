package com.ggul.application.account.ui.dto;


import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateDemandDepositRequest {
    private String bankCode;
    private String accountName;
    private String accountDescription;
}
