package com.ggul.application.account.query;

import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.infra.BankMasterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserKeyService {
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public String getUserKey(UUID userId){
        return accountRepository.findUserKeyByUserId(userId);
    }
}
