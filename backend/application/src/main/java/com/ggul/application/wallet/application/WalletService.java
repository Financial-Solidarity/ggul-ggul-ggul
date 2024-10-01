package com.ggul.application.wallet.application;

import com.ggul.application.wallet.application.dto.WalletInfo;
import com.ggul.application.wallet.application.dto.WalletTokenInfo;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class WalletService {
    private final TokenService tokenService;
    private final WalletRepository walletRepository;

    /**
     * Wallet 조회
     * @param userId 조회할 User Id
     * @return Wallet 정보
     */
    @Transactional
    public WalletInfo getWallet(UUID userId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        return new WalletInfo(wallet.getAddress(), wallet.getPrivateKey());
    }

    /**
     * Wallet Token 조회
     * @param userId 조회할 User Id
     * @return Wallet Token 정보
     */
    @Transactional
    public WalletTokenInfo getWalletToken(UUID userId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        Long balance = tokenService.getBalance(wallet.getAddress()).longValue();
        return new WalletTokenInfo(balance);
    }

}
