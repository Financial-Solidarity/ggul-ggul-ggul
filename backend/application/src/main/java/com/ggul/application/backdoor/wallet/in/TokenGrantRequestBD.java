package com.ggul.application.backdoor.wallet.in;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenGrantRequestBD {
    private String email;
    private Long quantity;
}

