package com.ggul.application.account.query;

import com.ggul.application.account.domain.repository.AccountRepository;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.InquireDemandDepositAccountView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemandDepositAccountService {
    private final BankMasterService bankMasterService;
    private final AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public Map<String, Object> getMyDemandDepositAccount(UUID userId, InquireDemandDepositAccountView inquireDemandDepositAccountView){
        String userKey = accountRepository.findUserKeyByUserId(userId);

        Map<String, Object> userAccountDetail = bankMasterService.getDemandDepositAccount(userKey, inquireDemandDepositAccountView.getAccountNo());
        log.info("userAccountDetail = {}", userAccountDetail);

        return (Map<String, Object>) userAccountDetail.get("REC") ;
    }

}
