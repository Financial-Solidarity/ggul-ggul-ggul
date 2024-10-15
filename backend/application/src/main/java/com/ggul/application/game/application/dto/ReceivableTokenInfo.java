package com.ggul.application.game.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReceivableTokenInfo {
    private Long receivableToken;
    private LocalDateTime lastReceiveAt;
}
