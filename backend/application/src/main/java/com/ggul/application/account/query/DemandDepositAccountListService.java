package com.ggul.application.account.query;

import com.ggul.application.account.domain.Account;
import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.infra.BankMasterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemandDepositAccountListService {
    private final BankMasterService bankMasterService;
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public Map<String, Object> getMyDemandDepositAccountList(UUID userId){
        String userKey = accountRepository.findUserKeyByUserId(userId);

        Map<String, Object> userAccountList = bankMasterService.getDemandDepositAccountList(userKey);
        log.info("userAccountList = {}", userAccountList);
        return userAccountList;
    }

}
