package com.ggul.application.backdoor.wallet;

import com.ggul.application.backdoor.wallet.in.TokenGenerateRequestBD;
import com.ggul.application.backdoor.wallet.in.TokenGrantRequestBD;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.application.TokenService;
import com.ggul.application.wallet.application.WalletGenerateService;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.ContractInsufficientTokenException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequestMapping("/backdoor/wallets")
@AllArgsConstructor
public class WalletBackdoor {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final TokenService tokenService;
    private final WalletGenerateService walletGenerateService;

    @GetMapping("/users/{email}/tokens")
    public ResponseEntity<?> getToken(@PathVariable String email){
        User user = userRepository.findByUsername(email).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("지갑 없음"));
        return ResponseEntity.ok().body(tokenService.getBalance(wallet.getAddress()));
    }

    @PostMapping("/users/tokens/grant")
    public ResponseEntity<?> grantToken(@RequestBody TokenGrantRequestBD request) throws ContractInsufficientTokenException {
        User user = userRepository.findByUsername(request.getEmail()).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("지갑 없음"));
        try{
            return ResponseEntity.ok().body(tokenService.grantTokens(wallet.getAddress(), BigInteger.valueOf(request.getQuantity())));
        } catch (ContractInsufficientTokenException e) {
            tokenService.generateTokens(BigInteger.valueOf(request.getQuantity()));
            return ResponseEntity.ok().body(tokenService.grantTokens(wallet.getAddress(), BigInteger.valueOf(request.getQuantity())));
        }
    }

    @PostMapping("/tokens/generate")
    public ResponseEntity<?> generateToken(@RequestBody TokenGenerateRequestBD request){
        return ResponseEntity.ok().body(tokenService.generateTokens(BigInteger.valueOf(request.getQuantity())));
    }
}
