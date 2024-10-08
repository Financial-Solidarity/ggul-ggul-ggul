package com.ggul.application.wallet.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WalletInfo {
    private String address;
    private String privateKey;
}
