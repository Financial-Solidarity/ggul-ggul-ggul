package com.ggul.application.account.ui;

import com.ggul.application.account.application.TerminationAccountService;
import com.ggul.application.account.query.UserKeyService;
import com.ggul.application.account.application.GenerationDemandDepositAccountService;
import com.ggul.application.account.application.GenerationUserService;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.AccountDepositAndWithdrawView;
import com.ggul.application.account.ui.dto.GenerationDemandDepositView;
import com.ggul.application.account.ui.dto.InquireDemandDepositAccountView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {
    private final GenerationUserService generationUserService;
    private final BankMasterService bankMasterService;
    private final GenerationDemandDepositAccountService generationDemandDepositAccountService;
    private final TerminationAccountService terminationAccountService;
    private final UserKeyService userKeyService;


    //유저 계정 만들기
    @PostMapping("/users")
    public ResponseEntity<?> createUsers(@AuthenticationPrincipal UserLoginContext userLoginContext){
        generationUserService.createUser(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    //은행코드보기
    @GetMapping("/bank-codes")
    public ResponseEntity<?> getBankCodes(){
        Map<String, Object> response = bankMasterService.getBankCodes();
        return ResponseEntity.ok(response.get("REC"));
    }


    //은행 상품 등록
    @PostMapping("/demand-deposits")
    public ResponseEntity<?> createDemandDeposit(@RequestBody GenerationDemandDepositView generationDemandDepositView){
        Map<String, Object> response = bankMasterService.createDemandDeposit(generationDemandDepositView);

        return ResponseEntity.ok(response.get("REC"));
    }

    //은행 상품 조회(위에서 만든거 조회하는거)
    @GetMapping("/demand-deposits")
    public ResponseEntity<?> getDemandDepositList(){
        Map<String, Object> response = bankMasterService.getDemandDepositList();

        return ResponseEntity.ok(response.get("REC"));
    }

    // 계좌 생성(단건)
    @PostMapping("/createDemandDepositAccount")
    public ResponseEntity<?> createDemandDepositAccount(){


        return ResponseEntity.ok(null);
    }

    // 지금 있는 상품들 싹다 등록 (모두 불러오기 딸깎) 누적해서 저장되니까 조심
    @PostMapping("/demand-deposits/accounts")
    public ResponseEntity<?> createDemandDepositAccounts(@AuthenticationPrincipal UserLoginContext userLoginContext){
        generationDemandDepositAccountService.createDepositAccount(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    // 내가 등록한 계좌들 조회
    @GetMapping("/demand-deposits/accounts")
    public ResponseEntity<?> getDemandDepositAccountListService(@AuthenticationPrincipal UserLoginContext userLoginContext){
        Map<String, Object> result = bankMasterService.getDemandDepositAccountList(getUserKey(userLoginContext.getUserId()));

        return ResponseEntity.ok(result);
    }

    // 내가 등록한 계좌 조회(단건)
    @GetMapping("/demand-deposits/accounts/{accountNo}")
    public ResponseEntity<?> getDemandDepositAccount(@PathVariable("accountNo") String accountNo, @AuthenticationPrincipal UserLoginContext userLoginContext){
        Map<String, Object> userAccount = (Map<String, Object>) bankMasterService.getDemandDepositAccount(getUserKey(userLoginContext.getUserId()), accountNo).get("REC");

        return ResponseEntity.ok(userAccount);
    }

    // 세션이 등록한 계좌를 모두 해지
    @DeleteMapping("/demand-deposits/accounts")
    public ResponseEntity<?> deleteDemandDepositMyAccounts(@AuthenticationPrincipal UserLoginContext userLoginContext){
        terminationAccountService.terminationMyAccounts(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    //계좌 입금
    @PostMapping("/demand-deposits/accounts/deposit")
    public ResponseEntity<?> demandDepositAccountDeposit(@AuthenticationPrincipal UserLoginContext userLoginContext, @RequestBody AccountDepositAndWithdrawView accountDepositAndWithdrawView){
        bankMasterService.demandDepositAccountDeposit(getUserKey(userLoginContext.getUserId()), accountDepositAndWithdrawView);

        return ResponseEntity.ok(null);
    }

    //계좌 출금
    @PostMapping("/demand-deposits/accounts/withdraw")
    public ResponseEntity<?> demandDepositAccountWithdrawal(@AuthenticationPrincipal UserLoginContext userLoginContext, @RequestBody AccountDepositAndWithdrawView accountDepositAndWithdrawView){
        bankMasterService.demandDepositAccountWithdrawal(getUserKey(userLoginContext.getUserId()), accountDepositAndWithdrawView);

        return ResponseEntity.ok(null);
    }



    private String getUserKey(UUID userId){
        return userKeyService.getUserKey(userId);
    }

}
