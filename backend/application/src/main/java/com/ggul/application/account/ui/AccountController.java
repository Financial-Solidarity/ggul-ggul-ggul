package com.ggul.application.account.ui;

import com.ggul.application.account.application.TerminationAccountService;
import com.ggul.application.account.query.DemandDepositAccountListService;
import com.ggul.application.account.application.GenerationDemandDepositAccountService;
import com.ggul.application.account.application.GenerationUserService;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.query.DemandDepositAccountService;
import com.ggul.application.account.ui.dto.GenerationDemandDepositView;
import com.ggul.application.account.ui.dto.GenerationUserView;
import com.ggul.application.account.ui.dto.InquireDemandDepositAccountView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {
    private final GenerationUserService generationUserService;
    private final UserRepository userRepository;
    private final BankMasterService bankMasterService;
    private final GenerationDemandDepositAccountService generationDemandDepositAccountService;
    private final DemandDepositAccountListService demandDepositAccountListService;
    private final DemandDepositAccountService demandDepositAccountService;
    private final TerminationAccountService terminationAccountService;


    //유저 계정 만들기
    @PostMapping("/users")
    public ResponseEntity<?> createUsers(@AuthenticationPrincipal UserLoginContext userLoginContext){
        generationUserService.createUser(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    //은행코드보기
    @GetMapping("/inquireBankCodes")
    public ResponseEntity<?> getBankCodes(){
        Map<String, Object> response = bankMasterService.getBankCodes();
        return ResponseEntity.ok(response.get("REC"));
    }


    //은행 상품 등록
    @PostMapping("/createDemandDeposit")
    public ResponseEntity<?> createDemandDeposit(@RequestBody GenerationDemandDepositView generationDemandDepositView){
        Map<String, Object> response = bankMasterService.createDemandDeposit(generationDemandDepositView);

        return ResponseEntity.ok(response.get("REC"));
    }

    //은행 상품 조회(위에서 만든거 조회하는거)
    @GetMapping("/inquireDemandDepositList")
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
    @PostMapping("/createDemandDepositAccounts")
    public ResponseEntity<?> createDemandDepositAccounts(@AuthenticationPrincipal UserLoginContext userLoginContext){
        generationDemandDepositAccountService.createDepositAccount(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    // 내가 등록한 계좌들 조회
    @GetMapping("/inquireDemandDepositAccountList")
    public ResponseEntity<?> getDemandDepositAccountListService(@AuthenticationPrincipal UserLoginContext userLoginContext){
        Map<String, Object> result = demandDepositAccountListService.getMyDemandDepositAccountList(userLoginContext.getUserId());

        return ResponseEntity.ok(result);
    }

    // 내가 등록한 계좌 조회(단건)
    @GetMapping("/inquireDemandDepositAccount")
    public ResponseEntity<?> getDemandDepositAccount(@RequestBody InquireDemandDepositAccountView inquireDemandDepositAccountView, @AuthenticationPrincipal UserLoginContext userLoginContext){
        demandDepositAccountService.getMyDemandDepositAccount(userLoginContext.getUserId(), inquireDemandDepositAccountView);

        return ResponseEntity.ok(null);
    }

    // 세션이 등록한 계좌를 모두 해지
    @DeleteMapping("/deleteDemandDepositAccounts")
    public ResponseEntity<?> deleteDemandDepositMyAccounts(@AuthenticationPrincipal UserLoginContext userLoginContext){
        terminationAccountService.terminationMyAccounts(userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }


}
