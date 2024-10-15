package com.ggul.application.account.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.atomic.AtomicInteger;

@Configuration
@Getter
public class AccountConfig {

    @Value("${account.base-url}")
    private String baseUrl;

    @Value("${account.api-key}")
    private String apiKey;

    @Value("${account.institution-code}")
    private String institutionCode;

    @Value("${account.fintech-app-no}")
    private String fintechAppNo;

    @Bean
    public AtomicInteger atomicInteger(){
        return new AtomicInteger(0);
    }

}
