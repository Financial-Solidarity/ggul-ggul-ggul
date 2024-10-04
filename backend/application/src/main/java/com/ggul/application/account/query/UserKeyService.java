package com.ggul.application.account.query;

import com.ggul.application.account.domain.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
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
