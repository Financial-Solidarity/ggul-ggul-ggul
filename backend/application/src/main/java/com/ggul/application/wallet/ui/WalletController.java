package com.ggul.application.wallet.ui;

import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.wallet.application.WalletService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    @GetMapping
    public ResponseEntity<?> getWallet(@AuthenticationPrincipal UserLoginContext userLoginContext){
        return ResponseEntity.ok(walletService.getWallet(userLoginContext.getUserId()));
    }

    @GetMapping("/token")
    public ResponseEntity<?> getWalletToken(@AuthenticationPrincipal UserLoginContext userLoginContext){
        return ResponseEntity.ok(walletService.getWalletToken(userLoginContext.getUserId()));
    }

    @GetMapping("/token/histories")
    public ResponseEntity<?> getWalletTokenHistories(@AuthenticationPrincipal UserLoginContext userLoginContext,
                                                     Pageable pageable){
        return ResponseEntity.ok(walletService.getWalletTokenHistories(userLoginContext.getUserId(), pageable));
    }
}
