package com.ggul.application.account.application;

import com.ggul.application.account.domain.Account;
import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.GenerationUserRequest;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class GenerationUserService {
    private final BankMasterService bankMasterService;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public void createUser(GenerationUserRequest generationUserRequest, UUID userId){
        Map<String, Object> map = bankMasterService.createBankMember(generationUserRequest);

        User loginUser = userRepository.getReferenceById(userId);

        Account account = Account.builder()
                .user(loginUser)
                .userKey((String)map.get("userKey"))
                .build();

        accountRepository.save(account);
    }

}
