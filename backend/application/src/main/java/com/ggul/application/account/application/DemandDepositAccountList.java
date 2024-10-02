package com.ggul.application.account.application;

import com.ggul.application.account.domain.Account;
import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DemandDepositAccountList {
    private final BankMasterService bankMasterService;
    private final AccountRepository accountRepository;

    public void getMyDemandDepositAccountList(UUID userId){
        Account userAccount = accountRepository.getReferenceById(userId);

        Map<String, Object> userAccountList = bankMasterService.getDemandDepositAccountList(userAccount.getUserKey());
        log.info("userAccountList = {}", userAccountList);

    }

}
