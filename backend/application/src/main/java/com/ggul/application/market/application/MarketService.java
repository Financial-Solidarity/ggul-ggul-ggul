package com.ggul.application.market.application;

import com.ggul.application.equipment.domain.Status;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import com.ggul.application.equipment.domain.TokenizedEquipmentRepository;
import com.ggul.application.equipment.exception.EquipmentAlreadyOwnedException;
import com.ggul.application.equipment.exception.EquipmentEquippedException;
import com.ggul.application.equipment.exception.EquipmentNotFoundException;
import com.ggul.application.equipment.exception.EquipmentSellingException;
import com.ggul.application.market.application.dto.*;
import com.ggul.application.market.domain.Market;
import com.ggul.application.market.domain.MarketDeal;
import com.ggul.application.market.domain.MarketDealRepository;
import com.ggul.application.market.domain.MarketRepository;
import com.ggul.application.market.exception.MarketCanceledException;
import com.ggul.application.market.exception.MarketCompletedException;
import com.ggul.application.market.exception.MarketNotFoundException;
import com.ggul.application.market.exception.MarketNotSellerException;
import com.ggul.application.market.application.dto.MarketListElement;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class MarketService {

    private final MarketSellService marketSellService;

    private final WalletRepository walletRepository;
    private final TokenizedEquipmentRepository tokenizedEquipmentRepository;
    private final MarketRepository marketRepository;
    private final UserRepository userRepository;
    private final MarketDealRepository marketDealRepository;

    /**
     * Market에 등록된 Equipment 판매 글 상세 조회
     * @param marketId 등록된 Market UUID
     * @return 판매 상세 조회
     */
    @Transactional
    public MarketInfo getMarket(UUID marketId) {
        Market market = marketRepository.findByIdUsingFetchAll(marketId).orElseThrow(MarketNotFoundException::new);
        return MarketInfo.from(market);
    }

    /**
     * Market의 등록된 Equipment 목록 조회
     * @param dto 조회할 필터링 정보
     * @return 조회된 판매 목록
     */
    @Transactional
    public Slice<MarketListElement> getMarkets(MarketSearchDto dto){
        return marketRepository.findBySearchParameter(dto);
    }

    /**
     * Market에 장비 판매 등록
     * @param dto 판매 정보
     * @return 판매 등록된 Market의 UUID
     */
    @Transactional
    public UUID sellEquipment(MarketSellDto dto) {
        Wallet wallet = walletRepository.findByUserId(dto.getUserId()).orElseThrow(WalletNotFoundException::new);
        TokenizedEquipment equipment = tokenizedEquipmentRepository.findByIpfsCID(dto.getIpfsCID()).orElseThrow(EquipmentNotFoundException::new);

        switch(equipment.getStatus()){
            case EQUIPPED: throw new EquipmentEquippedException();
            case SELLING: throw new EquipmentSellingException();
        }

        MarketRegisterSellResult result = marketSellService.sellEquipment(wallet.getAddress(), equipment, dto.getPrice());
        equipment.changeStatus(Status.SELLING);

        Market market = marketRepository.save(Market.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .seller(userRepository.getReferenceById(dto.getUserId()))
                .tokenizedEquipment(equipment)
                .build());

        marketDealRepository.save(MarketDeal.builder()
                .dealNo(result.getDealNo())
                .market(market)
                .build());
        return market.getId();
    }

    /**
     * Market 장비 구매
     * @param userId 구매자 User Id
     * @param marketId 구매할 Market의 UUID
     */
    @Transactional
    public void buyEquipment(UUID userId, UUID marketId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        Market market = marketRepository.findById(marketId).orElseThrow(MarketNotFoundException::new);

        if(Objects.equals(market.getSeller().getId(), userId))
            throw new EquipmentAlreadyOwnedException();

        switch(market.getStatus()){
            case CANCELED: throw new MarketCanceledException();
            case COMPLETED: throw new MarketCompletedException();
        }

        MarketBuyResult result = marketSellService.buyEquipment(wallet.getAddress(), market);
        TokenizedEquipment equipment = market.getTokenizedEquipment();
        equipment.changeStatus(Status.NONE);
        equipment.changeOwner(userRepository.getReferenceById(userId));

        market.changeStatus(com.ggul.application.market.domain.Status.COMPLETED);
        market.initBuyer(userRepository.getReferenceById(userId));
        market.initCompletedAt();
    }

    /**
     * Market 장비 등록 취소
     * @param userId 판매자 User Id
     * @param marketId 판매 취소할 Market의 UUID
     */
    @Transactional
    public void cancelSellEquipment(UUID userId, UUID marketId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        Market market = marketRepository.findById(marketId).orElseThrow(MarketNotFoundException::new);
        if(!Objects.equals(market.getSeller().getId(), userId))
            throw new MarketNotSellerException();

        switch(market.getStatus()){
            case CANCELED: throw new MarketCanceledException();
            case COMPLETED: throw new MarketCompletedException();
        }

        MarketCancelResult result = marketSellService.cancelSellEquipment(wallet.getAddress(), market);
        TokenizedEquipment equipment = market.getTokenizedEquipment();
        equipment.changeStatus(Status.NONE);

        market.changeStatus(com.ggul.application.market.domain.Status.CANCELED);
    }
}
