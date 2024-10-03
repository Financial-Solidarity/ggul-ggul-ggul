package com.ggul.application.account.application;

import com.ggul.application.account.domain.Account;
import com.ggul.application.account.domain.AccountRepository;
import com.ggul.application.account.domain.BankBook;
import com.ggul.application.account.domain.BankBookRepository;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GenerationDemandDepositAccountService {
    private final BankMasterService bankMasterService;
    private final AccountRepository accountRepository;
    private final BankBookRepository bankBookRepository;
    private final UserRepository userRepository;

    public List<Map<String, Object>> createDepositAccount(UUID userId){
        List<Map<String, Object>> demandDepositList = (List<Map<String, Object>>) getAllInquireDemandDepositList().get("REC");
        log.info("depositList = {}", demandDepositList);
        String userKey = accountRepository.findUserKeyByUserId(userId);
        User loginUser = userRepository.getReferenceById(userId);

        for(Map<String, Object> demandDeposit : demandDepositList){
            log.info("{}", demandDeposit.get("accountTypeUniqueNo"));
//            bankMasterService.createDemandDepositAccount((String)demandDeposit.get("accountTypeUniqueNo"));
            bankMasterService.createDemandDepositAccount(userKey, (String)demandDeposit.get("accountTypeUniqueNo"));
            saveBankBook(loginUser, (String)demandDeposit.get("accountTypeUniqueNo"));
        }

        return demandDepositList;
    }

    private Map<String, Object> getAllInquireDemandDepositList(){
        return bankMasterService.getDemandDepositList();
    }

    private void saveBankBook(User user, String accountNumber){
        BankBook bankBook = BankBook.builder()
                .user(user)
                .accountNumber(accountNumber)
                .build();

        bankBookRepository.save(bankBook);
    }


}
