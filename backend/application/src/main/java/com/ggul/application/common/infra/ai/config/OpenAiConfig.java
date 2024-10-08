package com.ggul.application.common.infra.ai.config;

import lombok.RequiredArgsConstructor;
import org.apache.http.client.methods.HttpHead;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.util.Map;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class OpenAiConfig {

    @Value("${openai.api.key}")
    private String openAiKey;

    @Bean
    public HttpHeaders openAiHeaders(){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiKey);
        headers.set("Content-Type", "application/json");

        return headers;
    }


}
