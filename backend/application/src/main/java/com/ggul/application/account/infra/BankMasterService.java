package com.ggul.application.account.infra;

import com.ggul.application.account.config.AccountConfig;
import com.ggul.application.account.exception.CreateUserAccountFailureException;
import com.ggul.application.account.ui.dto.CreateUserRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
@Transactional
public class BankMasterService {
    private final AccountConfig accountConfig;
    private final RestClient restClient;
    private final AtomicInteger counter;

    public Map<String, String> createBankMember(CreateUserRequest createUserRequest){
        Map<String, String> map = new HashMap<>();
        map.put("apiKey", accountConfig.getApiKey());
        map.put("userId", createUserRequest.getUserId());

        try{
            return restClient.post()
                    .uri(accountConfig.getBaseUrl() + "/member")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(map)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, String>>() {});

        } catch(Exception e){
            throw new CreateUserAccountFailureException();
        }

    }




    private int generatorInstitutionTransactionUniqueNo(){
        int value = counter.getAndIncrement();
        if(value == 99999)
            counter.set(0);
        return value;
    }}
