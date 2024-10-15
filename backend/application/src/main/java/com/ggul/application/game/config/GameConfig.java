package com.ggul.application.game.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@RequiredArgsConstructor
public class GameConfig {
    @Value("${game.reward.term}")
    private Long term;
}
