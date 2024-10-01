package com.ggul.application.equipment.application;

import com.ggul.application.equipment.application.dto.EquipmentDrawResult;
import com.ggul.application.equipment.application.dto.EquipmentInfo;
import com.ggul.application.equipment.application.dto.EquipmentMintResult;
import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.equipment.domain.*;
import com.ggul.application.equipment.exception.EquipmentAlreadyMintedException;
import com.ggul.application.equipment.exception.EquipmentNotFoundException;
import com.ggul.application.equipment.exception.EquipmentValidationFailureException;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EquipmentService {

    private final EquipmentDrawService equipmentDrawService;
    private final EquipmentNFTService equipmentNFTService;

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final EquipmentRepository equipmentRepository;
    private final EquipmentItemRepository equipmentItemRepository;
    private final TokenizedEquipmentRepository tokenizedEquipmentRepository;

    /**
     * Equipment 뽑기
     * @param userId Equipment를 뽑을 User Id
     * @return 뽑은 Equipment 정보
     */
    @Transactional
    public EquipmentInfo drawEquipment(UUID userId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        // TODO. AI로 Adjective 생성 로직 추가
        String adjective = "비범한";

        EquipmentDrawResult result = equipmentDrawService.drawEquipment(wallet.getAddress());

        EquipmentItem equipmentItem = equipmentItemRepository.getReferenceById(result.getItem().longValue());
        Equipment equipment = equipmentRepository.save(Equipment.builder()
                .publisher(wallet.getAddress())
                .adjective(adjective)
                .power(result.getPower().longValue())
                .item(equipmentItem)
                .transactionHash(result.getTransactionHash())
                .minted(false)
                .build());

        return EquipmentInfo.from(equipment);
    }

    /**
     * Equipment NFT 발행
     * @param userId Equipment를 뽑을 User Id
     * @param transactionHash 발행할 Equipment TransactionHash
     * @return NFT로 발행된 Equipment 정보
     */
    @Transactional
    public TokenizedEquipmentInfo mintEquipment(UUID userId, String transactionHash) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        Equipment equipment = equipmentRepository.findByTransactionHash(transactionHash).orElseThrow(EquipmentNotFoundException::new);
        EquipmentDrawResult drawResult = equipmentDrawService.getDrawResult(transactionHash);
        validateTransaction(equipment, drawResult);

        EquipmentMintResult mintResult =  equipmentNFTService.mintNFT(wallet.getAddress(), equipment);
        equipment.runMint();

        TokenizedEquipment tokenizedEquipment = tokenizedEquipmentRepository.save(TokenizedEquipment.builder()
                .owner(userRepository.getReferenceById(userId))
                .ipfsCID(mintResult.getIpfsCID())
                .nftUrl(mintResult.getNftURI())
                .equipment(equipment)
                .status(Status.NONE)
                .build());
        return TokenizedEquipmentInfo.from(tokenizedEquipment);
    }

    private void validateTransaction(Equipment equipment, EquipmentDrawResult result) {
        if (!Objects.equals(equipment.getItem().getId(), result.getItem().longValue())
                || !Objects.equals(equipment.getPower(), result.getPower().longValue())
                || !Objects.equals(equipment.getTransactionHash(), result.getTransactionHash())
                || !Objects.equals(equipment.getPublisher(), result.getPublisher()))
            throw new EquipmentValidationFailureException();
        else if(equipment.getMinted())
            throw new EquipmentAlreadyMintedException();
    }
}
