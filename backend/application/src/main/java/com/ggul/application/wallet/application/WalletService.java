package com.ggul.application.wallet.application;

import com.ggul.application.common.util.ListUtils;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.application.dto.WalletHistoryInfo;
import com.ggul.application.wallet.application.dto.WalletInfo;
import com.ggul.application.wallet.application.dto.WalletTokenInfo;
import com.ggul.application.wallet.domain.*;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.UUID;

@Service
@AllArgsConstructor
public class WalletService {
    private final TokenService tokenService;
    private final WalletHistoryRepository walletHistoryRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

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

    /**
     * 토큰 사용 내역 기록
     * @param userId Token 증감을 기록할 User Id
     * @param isPositive 증감 여부
     * @param quantity Token 사용량
     * @param category 사용 범주
     * @return WalletHistory 영속 Entity
     */
    @Transactional
    public WalletHistory registerWalletHistory(UUID userId, Boolean isPositive, Long quantity, Category category) {
        return walletHistoryRepository.save(WalletHistory.builder()
                .user(userRepository.getReferenceById(userId))
                .quantity(quantity)
                .category(category)
                .isPositive(isPositive)
                .build());
    }

    /**
     * 토큰 사용 내역 조회
     * @param userId 조회할 User Id
     * @param pageable pageable 객체
     * @return 조회된 토큰 사용 내역
     */
    @Transactional
    public Slice<WalletHistoryInfo> getWalletTokenHistories(UUID userId, Pageable pageable) {
        Slice<WalletHistory> walletHistories = walletHistoryRepository.findByUserId(userId, pageable);
        return new SliceImpl<>(ListUtils.applyFunctionToElements(walletHistories.getContent(), WalletHistoryInfo::from),
                walletHistories.getPageable(),
                walletHistories.hasNext());
    }

    /**
     * 토큰 사용
     * @param userId 사용할 User Id
     * @param quantity Token 사용량
     */
    @Transactional
    public void useToken(UUID userId, Long quantity){
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        tokenService.useToken(wallet.getAddress(), BigInteger.valueOf(quantity));
    }
}
