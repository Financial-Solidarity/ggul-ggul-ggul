package com.ggul.application.springconfig.global;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class GlobalConfig {

    @Bean
    public RestClient restClient() {
        return RestClient.create();
    }
}
