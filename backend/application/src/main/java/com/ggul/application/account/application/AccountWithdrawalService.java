package com.ggul.application.account.application;


import com.ggul.application.account.domain.Account;
import com.ggul.application.account.domain.PrimaryAccount;
import com.ggul.application.account.domain.repository.AccountRepository;
import com.ggul.application.account.domain.repository.PrimaryAccountRepository;
import com.ggul.application.account.exception.NotEnoughMoneyException;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.AccountDepositAndWithdrawView;
import com.ggul.application.payment.application.dto.PaymentRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AccountWithdrawalService {
    private final BankMasterService bankMasterService;
    private final PrimaryAccountRepository primaryAccountRepository;
    private final AccountRepository accountRepository;
    private final UserPrimaryAccountService userPrimaryAccountService;

    public void accountWithdraw(Integer requiredMoney, UUID sessionId){
        String userKey = accountRepository.findUserKeyByUserId(sessionId);
        String accountNo = getPrimaryAccount(sessionId);
        Long accountBalance = getPrimaryAccountBalance(userKey, accountNo);

        log.info("userKey = {}", userKey);
        log.info("accountNo = {}", accountNo);
        log.info("accountBalance = {}", accountBalance);

        if(accountBalance - requiredMoney < 0){
            throw new NotEnoughMoneyException();
        }

        AccountDepositAndWithdrawView accountDepositAndWithdrawView = AccountDepositAndWithdrawView.builder()
                .accountNo(accountNo)
                .transactionBalance(requiredMoney.longValue())
                .build();

        if(requiredMoney.longValue() != 0) bankMasterService.demandDepositAccountWithdrawal(userKey, accountDepositAndWithdrawView);

    }

    //주 계좌 찾기
    private String getPrimaryAccount(UUID sessionId){
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUser_id(sessionId);

        return primaryAccount.getAccountNo();
    }

    //계좌 잔고 확인
    private Long getPrimaryAccountBalance(String userKey, String accountNo){
        Map<String, Object> result = (Map<String, Object>) bankMasterService.getDemandDepositAccount(userKey, accountNo).get("REC");

        return Long.parseLong((String) result.get("accountBalance"));
    }

}
