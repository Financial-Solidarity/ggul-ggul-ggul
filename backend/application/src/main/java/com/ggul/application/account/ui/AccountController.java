package com.ggul.application.account.ui;

import com.ggul.application.account.application.CreateUserService;
import com.ggul.application.account.infra.BankMasterService;
import com.ggul.application.account.ui.dto.CreateDemandDepositRequest;
import com.ggul.application.account.ui.dto.CreateUserRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.user.domain.User;
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
    private final CreateUserService createUserService;
    private final UserRepository userRepository;
    private final BankMasterService bankMasterService;

    @PostMapping("/users")
    public ResponseEntity<?> createUsers(@RequestBody CreateUserRequest createUserRequest, @AuthenticationPrincipal UserLoginContext userLoginContext){
        createUserService.createUser(createUserRequest, userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

    @GetMapping("/inquireBankCodes")
    public ResponseEntity<?> getBankCodes(){
        Map<String, Object> response = bankMasterService.getBankCodes();
        return ResponseEntity.ok(response.get("REC"));
    }

    @PostMapping("/createDemandDeposit")
    public ResponseEntity<?> createDemandDeposit(@RequestBody CreateDemandDepositRequest createDemandDepositRequest){
        Map<String, Object> response = bankMasterService.createDemandDeposit(createDemandDepositRequest);

        return ResponseEntity.ok(response.get("REC"));
    }

    @GetMapping("/inquireDemandDepositList")
    public ResponseEntity<?> getDemandDepositList(){
        Map<String, Object> response = bankMasterService.getDemandDepositList();

        return ResponseEntity.ok(response.get("REC"));
    }


}
