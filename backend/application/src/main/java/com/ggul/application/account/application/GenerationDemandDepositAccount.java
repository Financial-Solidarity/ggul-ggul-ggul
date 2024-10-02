package com.ggul.application.account.application;

import com.ggul.application.account.infra.BankMasterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GenerationDemandDepositAccount {
    private final BankMasterService bankMasterService;

    public List<Map<String, Object>> createDepositAccount(){
        List<Map<String, Object>> demandDepositList = (List<Map<String, Object>>) getAllInquireDemandDepositList().get("REC");
        log.info("depositList = {}", demandDepositList);

        for(Map<String, Object> demandDeposit : demandDepositList){
            log.info("{}", demandDeposit.get("accountTypeUniqueNo"));
            bankMasterService.createDemandDepositAccount((String)demandDeposit.get("accountTypeUniqueNo"));
        }

        return demandDepositList;
    }

    private Map<String, Object> getAllInquireDemandDepositList(){
        return bankMasterService.getDemandDepositList();

    }

}
