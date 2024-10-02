package com.ggul.application.account.infra;

import com.ggul.application.account.config.AccountConfig;
import com.ggul.application.account.exception.GenerationDemandDepositFailureException;
import com.ggul.application.account.exception.GenerationUserAccountFailureException;
import com.ggul.application.account.ui.dto.GenerationDemandDepositView;
import com.ggul.application.account.ui.dto.GenerationUserView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public Map<String, Object> createBankMember(String userName){
        Map<String, Object> body = new HashMap<>();
        body.put("apiKey", accountConfig.getApiKey());
        body.put("userId", userName);

        try{
            postRequest("/member", body);
        } catch(Exception e){
            throw new GenerationUserAccountFailureException();
        } finally {
            return postRequest("/member/search",body);
        }

    }


    public Map<String, Object> getBankCodes(){
        String url = "/edu/bank/inquireBankCodes";
        Map<String, Object> body = generatorBodyWithHeader(url, null);
        return postRequest(url, body);
    }



    public Map<String, Object> createDemandDeposit(GenerationDemandDepositView generationDemandDepositView){
        String url = "/edu/demandDeposit/createDemandDeposit";
        Map<String, Object> body = generatorBodyWithHeader(url, null);
        body.put("bankCode", generationDemandDepositView.getBankCode());
        body.put("accountName", generationDemandDepositView.getAccountName());
        body.put("accountDescription", generationDemandDepositView.getAccountDescription());

        try{
            return postRequest(url, body);
        } catch(Exception e){
            throw new GenerationDemandDepositFailureException();
        }

    }


    public Map<String, Object> getDemandDepositList(){
        String url = "/edu/demandDeposit/inquireDemandDepositList";
        Map<String, Object> body = generatorBodyWithHeader(url, null);

        return postRequest(url, body);
    }

    public Map<String, Object> createDemandDepositAccount(String userKey, String accountTypeUniqueNo){
        String url = "/edu/demandDeposit/createDemandDepositAccount";
        Map<String, Object> body = generatorBodyWithHeader(url, userKey);
        body.put("accountTypeUniqueNo", accountTypeUniqueNo);

        return postRequest(url, body);
    }

    public Map<String, Object> getDemandDepositAccountList(String userKey){
        String url = "/edu/demandDeposit/inquireDemandDepositAccountList";
        Map<String, Object> body = generatorBodyWithHeader(url, userKey);

        return postRequest(url, body);
    }


    public Map<String, Object> getDemandDepositAccount(String userKey, String accountNo){
        String url = "/edu/demandDeposit/inquireDemandDepositAccount";
        Map<String, Object> body = generatorBodyWithHeader(url, userKey);
        body.put("accountNo", accountNo);

        return postRequest(url, body);
    }





    private int generatorInstitutionTransactionUniqueNo(){
        int value = counter.getAndIncrement();
        if(value == 99999)
            counter.set(0);
        return value;
    }

    private Map<String, Object> generatorBodyWithHeader(String url, String userKey){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> header = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();

        header.put("apiName", url.substring(url.lastIndexOf("/") + 1));
        header.put("transmissionDate", now.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        header.put("transmissionTime", now.format(DateTimeFormatter.ofPattern("HHmmss")));
        header.put("institutionCode", accountConfig.getInstitutionCode());
        header.put("fintechAppNo", accountConfig.getFintechAppNo());
        header.put("apiServiceCode", header.get("apiName"));
        header.put("institutionTransactionUniqueNo",
                now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + String.format("%06d", generatorInstitutionTransactionUniqueNo())
        );
        header.put("apiKey", accountConfig.getApiKey());
        if(userKey != null) header.put("userKey", userKey);
        result.put("Header", header);

        return result;
    }

    private Map<String, Object> postRequest(String url, Map<String, Object> body){
        return restClient.post()
                .uri(accountConfig.getBaseUrl() + url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

}
