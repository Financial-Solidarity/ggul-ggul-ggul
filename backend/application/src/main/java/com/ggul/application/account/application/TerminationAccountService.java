package com.ggul.application.account.application;

import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.domain.BankBookRepository;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.query.DemandDepositAccountListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TerminationAccountService {
    private final BankMasterService bankMasterService;
    private final BankBookRepository bankBookRepository;
    private final AccountRepository accountRepository;
    private final DemandDepositAccountListService demandDepositAccountListService;

    public void terminationMyAccounts(UUID userId){
        String userKey = accountRepository.findUserKeyByUserId(userId);

        List<Map<String, Object>> userAccountList = (List<Map<String, Object>>)demandDepositAccountListService.getMyDemandDepositAccountList(userId).get("REC");

        for(Map<String, Object> account : userAccountList){
            log.info("{}", account.get("accountNo"));
            String accountNo = (String)account.get("accountNo");
            bankMasterService.deleteDemandDepositAccount(userKey, accountNo);
        }

        bankBookRepository.deleteAllMyAccount(userId);

    }

}
