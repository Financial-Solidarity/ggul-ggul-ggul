package com.ggul.application.account.ui;

import com.ggul.application.account.application.DemandDepositAccountList;
import com.ggul.application.account.application.GenerationDemandDepositAccount;
import com.ggul.application.account.application.GenerationUserService;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.GenerationDemandDepositRequest;
import com.ggul.application.account.ui.dto.GenerationUserRequest;
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
    private final GenerationDemandDepositAccount generationDemandDepositAccount;
    private final DemandDepositAccountList demandDepositAccountList;

    @PostMapping("/users")
    public ResponseEntity<?> createUsers(@RequestBody GenerationUserRequest generationUserRequest, @AuthenticationPrincipal UserLoginContext userLoginContext){
        generationUserService.createUser(generationUserRequest, userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    @GetMapping("/inquireBankCodes")
    public ResponseEntity<?> getBankCodes(){
        Map<String, Object> response = bankMasterService.getBankCodes();
        return ResponseEntity.ok(response.get("REC"));
    }

    @PostMapping("/createDemandDeposit")
    public ResponseEntity<?> createDemandDeposit(@RequestBody GenerationDemandDepositRequest generationDemandDepositRequest){
        Map<String, Object> response = bankMasterService.createDemandDeposit(generationDemandDepositRequest);

        return ResponseEntity.ok(response.get("REC"));
    }

    @GetMapping("/inquireDemandDepositList")
    public ResponseEntity<?> getDemandDepositList(){
        Map<String, Object> response = bankMasterService.getDemandDepositList();

        return ResponseEntity.ok(response.get("REC"));
    }

    @PostMapping("/createDemandDepositAccount")
    public ResponseEntity<?> createDemandDepositAccount(){


        return ResponseEntity.ok(null);
    }

    @PostMapping("/createDemandDepositAccounts")
    public ResponseEntity<?> createDemandDepositAccounts(){
        generationDemandDepositAccount.createDepositAccount();
        return ResponseEntity.ok(null);
    }

    @GetMapping("/inquireDemandDepositAccountList")
    public ResponseEntity<?> getDemandDepositAccountList(@AuthenticationPrincipal UserLoginContext userLoginContext){
        demandDepositAccountList.getMyDemandDepositAccountList(userLoginContext.getUserId());
        return ResponseEntity.ok(null);
    }

}
