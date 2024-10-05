package com.ggul.application.account.application;

import com.ggul.application.account.domain.PrimaryAccount;
import com.ggul.application.account.domain.repository.PrimaryAccountRepository;
import com.ggul.application.account.application.dto.PrimaryAccountDto;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.query.UserKeyService;
import com.ggul.application.account.ui.dto.InquireDemandDepositAccountView;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserPrimaryAccountService {
    private final PrimaryAccountRepository primaryAccountRepository;
    private final BankMasterService bankMasterService;
    private final UserKeyService userKeyService;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PrimaryAccountDto getPrimaryAccount(UUID userId){
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUser_id(userId);

        if(primaryAccount == null){
            return null;
        }

        return PrimaryAccountDto.builder()
                .accountNo(primaryAccount.getAccountNo())
                .build();
    }

    @Transactional
    public void setPrimaryAccount(UUID userId, InquireDemandDepositAccountView inquireDemandDepositAccountView){
        String userKey = userKeyService.getUserKey(userId);
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUser_id(userId);
        User user = userRepository.findById(userId)
                .orElseGet(() -> null);

        Map<String, Object> account = (Map<String, Object>) bankMasterService.getDemandDepositAccount(userKey, inquireDemandDepositAccountView.getAccountNo()).get("REC");

        log.info("{}", account);

        if(primaryAccount == null){
            PrimaryAccount saveAccount = PrimaryAccount
                    .builder()
                    .accountNo(inquireDemandDepositAccountView.getAccountNo())
                    .user(user)
                    .build();

            primaryAccountRepository.save(saveAccount);
        }
        // 업데이트 할때 userName한테 받은 accountNo가 bankService에서 가져온 userName이랑 같은지 체크
        else if(account.get("userName").equals(user.getUsername().substring(0, user.getUsername().indexOf("@")))){
            primaryAccount.updateAccountNo(inquireDemandDepositAccountView.getAccountNo());
        }


    }


}
