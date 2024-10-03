package com.ggul.application.game.application;

import com.ggul.application.equipment.domain.Status;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import com.ggul.application.equipment.domain.TokenizedEquipmentRepository;
import com.ggul.application.equipment.exception.EquipmentNotEquippedException;
import com.ggul.application.game.application.dto.ReceivableTokenInfo;
import com.ggul.application.game.config.GameConfig;
import com.ggul.application.game.domain.Game;
import com.ggul.application.game.domain.GameRepository;
import com.ggul.application.game.exception.GameNotFoundException;
import com.ggul.application.wallet.application.TokenService;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.ContractInsufficientTokenException;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class GameService {

    private final GameConfig gameConfig;

    private final TokenService tokenService;

    private final WalletRepository walletRepository;
    private final GameRepository gameRepository;
    private final TokenizedEquipmentRepository tokenizedEquipmentRepository;

    /**
     * 획득할 수 있는 토큰 정보 조회
     * @param userId 조회할 User Id
     * @return 획득할 수 있는 토큰 정보
     */
    @Transactional
    public ReceivableTokenInfo getReceivableTokenInfo(UUID userId) {
        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByUserIdAndStatusUsingFetchAll(userId, Status.EQUIPPED)
                .orElseThrow(EquipmentNotEquippedException::new);
        Game game = gameRepository.findById(userId).orElseThrow(GameNotFoundException::new);

        Long receivableToken = (getSecondDuration(game)/ gameConfig.getTerm()) * equipment.getEquipment().getPower();

        return new ReceivableTokenInfo(receivableToken, game.getLastReceivedAt());
    }

    /**
     * 획득할 수 있는 토큰 수령
     * @param userId 수령할 User Id
     */
    @Transactional
    public void receiveToken(UUID userId) {
        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByUserIdAndStatusUsingFetchAll(userId, Status.EQUIPPED)
                .orElseThrow(EquipmentNotEquippedException::new);
        Game game = gameRepository.findById(userId).orElseThrow(GameNotFoundException::new);

        long receivableToken = (getSecondDuration(game)/ gameConfig.getTerm()) * equipment.getEquipment().getPower();

        if (receivableToken == 0)
            return;

        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        try{
            tokenService.grantTokens(wallet.getAddress(), BigInteger.valueOf(receivableToken));
        } catch (ContractInsufficientTokenException e) {
            tokenService.retryGrantToken(wallet.getAddress(), BigInteger.valueOf(receivableToken));
        }

        long leftTime = getSecondDuration(game) % gameConfig.getTerm();
        game.changeLastReceiveAt(LocalDateTime.now().minusSeconds(leftTime));
    }

    private Long getSecondDuration(Game game){
        return Duration.between(game.getLastReceivedAt(), LocalDateTime.now()).getSeconds();
    }
}
