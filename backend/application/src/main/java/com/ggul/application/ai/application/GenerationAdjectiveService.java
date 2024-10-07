package com.ggul.application.ai.application;

import com.ggul.application.ai.ui.dto.OpenApiRequest;
import com.ggul.application.ai.ui.dto.OpenApiResponse;
import com.ggul.application.common.infra.ai.config.OpenAiConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GenerationAdjectiveService {
    private final OpenAiConfig openAiConfig;
    private final RestClient restClient;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;


    public String makeAdjective(Long adjectiveNumber){
        HttpHeaders headers = openAiConfig.openAiHeaders();
        OpenApiRequest request = new OpenApiRequest(adjectiveNumber);
//        String prompt = request.getPrompt();
        log.info("prompt : {}", request.getMessages().get(0).getContent());
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", request.getMessages());

        String result = "";
        try{
            OpenApiResponse openApiResponse = restClient.post()
                    .uri(apiUrl)
                    .headers(httpHeaders -> httpHeaders.addAll(headers))
                    .body(body)
                    .retrieve()
                    .body(OpenApiResponse.class);

            log.info("openApiResponse = {}", openApiResponse);

            result = openApiResponse.getChoices().get(0).getMessage().getContent();
        } catch(Exception e){
            result = "비범한";
        }



        return result;

    }


}
