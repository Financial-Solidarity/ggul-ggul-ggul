package com.ggul.application.equipment.application;

import com.ggul.application.common.util.ListUtils;
import com.ggul.application.equipment.application.dto.EquipmentDrawResult;
import com.ggul.application.equipment.application.dto.EquipmentInfo;
import com.ggul.application.equipment.application.dto.EquipmentMintResult;
import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.equipment.domain.*;
import com.ggul.application.equipment.exception.*;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
     * @param userId Equipment 뽑을 User Id
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
     * @param userId Equipment 뽑을 User Id
     * @param transactionHash 발행할 Equipment TransactionHash
     * @return NFT로 발행된 Equipment 정보
     */
    @Transactional
    public TokenizedEquipmentInfo mintEquipment(UUID userId, String transactionHash) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        Equipment equipment = equipmentRepository.findByTransactionHash(transactionHash).orElseThrow(EquipmentNotFoundException::new);
        EquipmentDrawResult drawResult = equipmentDrawService.getDrawResult(transactionHash);
        validateTransaction(equipment, drawResult);

        EquipmentMintResult mintResult = equipmentNFTService.mintNFT(wallet.getAddress(), equipment);
        equipment.runMint();

        TokenizedEquipment tokenizedEquipment = tokenizedEquipmentRepository.save(TokenizedEquipment.builder()
                .owner(userRepository.getReferenceById(userId))
                .ipfsCID(mintResult.getIpfsCID())
                .nftUrl(mintResult.getNftURI())
                .equipment(equipment)
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

    /**
     * 소유한 Equipment 리스트 조회
     * @param userId 조회할 User Id
     * @param minPower 조회할 Power 최솟값
     * @param maxPower 조회할 Power 최댓값
     * @return 조회된 Equipment 리스트 정보
     */
    @Transactional
    public List<TokenizedEquipmentInfo> getEquipments(UUID userId, Long minPower, Long maxPower) {
        List<TokenizedEquipment> equipments = tokenizedEquipmentRepository.findByUserIdAndEquipmentPowerBetweenUsingFetchAll(userId, minPower, maxPower);
        return ListUtils.applyFunctionToElements(equipments, TokenizedEquipmentInfo::from);
    }

    /**
     * 착용한 Equipment 조회
     * @param userId 조회할 User Id
     * @return 조회된 Equipment 정보
     */
    @Transactional
    public TokenizedEquipmentInfo getEquippedEquipment(UUID userId) {
        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByUserIdAndStatusUsingFetchAll(userId, Status.EQUIPPED)
                .orElseThrow(EquipmentNotEquippedException::new);
        return TokenizedEquipmentInfo.from(equipment);
    }

    /**
     * Equipment 착용
     * @param userId 착용할 User Id
     * @param ipfsCID 착용할 Equipment ipfsCID
     */
    @Transactional
    public void equipEquipment(UUID userId, String ipfsCID) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByIpfsCID(ipfsCID).orElseThrow(EquipmentNotFoundException::new);
        if(!equipmentNFTService.verifyOwner(wallet.getAddress(), equipment))
            throw new EquipmentUnauthorizedException();

        switch(equipment.getStatus()){
            case SELLING: throw new EquipmentSellingException();
            case EQUIPPED: throw new EquipmentEquippedException();
        }

        Optional<TokenizedEquipment> previous = tokenizedEquipmentRepository.findByUserIdAndStatus(userId, Status.EQUIPPED);
        previous.ifPresent(previousEquipment -> previousEquipment.changeStatus(Status.NONE));

        equipment.changeStatus(Status.EQUIPPED);
    }

    /**
     * Equipment 해제
     * @param userId Equipment 해제할 User Id
     * @param ipfsCID 해제할 Equipment ipfsCID
     */
    @Transactional
    public void unequipEquipment(UUID userId, String ipfsCID) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByIpfsCID(ipfsCID).orElseThrow(EquipmentNotFoundException::new);
        if(!equipmentNFTService.verifyOwner(wallet.getAddress(), equipment))
            throw new EquipmentUnauthorizedException();

        switch(equipment.getStatus()){
            case NONE: throw new EquipmentNotEquippedException();
            case SELLING: throw new EquipmentSellingException();
        }
        equipment.changeStatus(Status.NONE);
    }

    /**
     * Equipment 삭제
     * @param userId Equipment 삭제할 User Id
     * @param ipfsCID 삭제할 Equipment ipfsCID
     */
    @Transactional
    public void removeEquipment(UUID userId, String ipfsCID) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);

        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByIpfsCID(ipfsCID).orElseThrow(EquipmentNotFoundException::new);

        switch(equipment.getStatus()){
            case SELLING: throw new EquipmentSellingException();
            case EQUIPPED: throw new EquipmentEquippedException();
        }
        equipmentNFTService.burnNFT(wallet.getAddress(), equipment);
        tokenizedEquipmentRepository.delete(equipment);
    }

    /**
     * Equipment Item 이름 조회
     * @return Equipment Item 이름 목록
     */
    @Transactional
    public List<String> getEquipmentNames() {
        return ListUtils.applyFunctionToElements(equipmentItemRepository.findAll(), EquipmentItem::getName);
    }
}
