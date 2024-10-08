package com.ggul.application.market.application;

import com.ggul.application.equipment.application.EquipmentNFTService;
import com.ggul.application.equipment.domain.TokenizedEquipment;
import com.ggul.application.equipment.exception.EquipmentUnauthorizedException;
import com.ggul.application.market.application.dto.MarketBuyResult;
import com.ggul.application.market.application.dto.MarketCancelResult;
import com.ggul.application.market.application.dto.MarketRegisterSellResult;
import com.ggul.application.market.domain.Market;
import com.ggul.application.market.domain.MarketDeal;
import com.ggul.application.market.domain.MarketDealRepository;
import com.ggul.application.market.exception.MarketNotFoundException;
import com.ggul.application.market.infra.MarketContract;
import com.ggul.application.wallet.application.TokenService;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@AllArgsConstructor
public class MarketSellService {

    private final TokenService tokenService;
    private final EquipmentNFTService equipmentNFTService;

    private final MarketDealRepository marketDealRepository;

    private final MarketContract adminMarketContract;

    /**
     * Equipment 판매 등록
     * @param sellerAddress 판매자 지갑 Address
     * @param equipment 판매할 Equipment
     * @param price 판매 가격
     * @return 판매 등록 결과
     */
    public MarketRegisterSellResult sellEquipment(String sellerAddress, TokenizedEquipment equipment, Long price) {
        if(!equipmentNFTService.verifyOwner(sellerAddress, equipment))
            throw new EquipmentUnauthorizedException();
        TransactionReceipt tr = handleException(call(adminMarketContract.sell(sellerAddress, BigInteger.valueOf(price), equipment.getIpfsCID())));
        MarketContract.MarketRegisterSellResultEventResponse response = MarketContract.getMarketRegisterSellResultEvents(tr).get(0);
        return MarketRegisterSellResult.of(tr.getTransactionHash(), response);
    }

    /**
     * Equipment 구매
     * @param buyerAddress 구매자 지갑 Address
     * @param market 구매할 Market 정보
     * @return 구매 결과
     */
    public MarketBuyResult buyEquipment(String buyerAddress, Market market) {
        if(tokenService.getBalance(buyerAddress).longValue() < market.getPrice())
            throw new WalletInsufficientTokenException();
        MarketDeal deal = marketDealRepository.findByMarket(market).orElseThrow(MarketNotFoundException::new);
        TransactionReceipt tr = handleException(call(adminMarketContract.buy(buyerAddress, BigInteger.valueOf(deal.getDealNo()))));
        MarketContract.MarketBuyResultEventResponse response = MarketContract.getMarketBuyResultEvents(tr).get(0);
        return MarketBuyResult.of(tr.getTransactionHash(), response);
    }

    /**
     * Equipment 판매 등록 취소
     * @param sellerAddress 판매자 지갑 Address
     * @param market 판매 취소할 Market 정보
     * @return 판매 등록 취소 결과
     */
    public MarketCancelResult cancelSellEquipment(String sellerAddress, Market market) {
        MarketDeal deal = marketDealRepository.findByMarket(market).orElseThrow(MarketNotFoundException::new);
        TransactionReceipt tr = handleException(call(adminMarketContract.cancel(sellerAddress, BigInteger.valueOf(deal.getDealNo()))));
        MarketContract.MarketCancelResultEventResponse response = MarketContract.getMarketCancelResultEvents(tr).get(0);
        return MarketCancelResult.of(tr.getTransactionHash(), response);
    }
}
