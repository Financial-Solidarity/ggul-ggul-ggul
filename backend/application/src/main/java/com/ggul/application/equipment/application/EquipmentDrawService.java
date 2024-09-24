package com.ggul.application.equipment.application;

import com.ggul.application.common.infra.blockchain.EthereumCall;
import com.ggul.application.equipment.infra.EquipmentDrawContract;
import com.ggul.application.equipment.application.dto.EquipmentDrawResult;
import com.ggul.application.equipment.application.dto.EquipmentDrawTransactionResult;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import com.ggul.application.wallet.infra.TokenContract;
import com.ggul.application.wallet.infra.exception.ERC20InsufficientBalanceException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@RequiredArgsConstructor
public class EquipmentDrawService {
    private final TokenContract adminTokenDrawContract;
    private final EquipmentDrawContract adminEquipmentDrawContract;
    private BigInteger DRAW_COST;

    @PostConstruct
    private void initialize() {
        DRAW_COST = handleException(call(adminEquipmentDrawContract.DRAW_COST()));
    }

    /**
     * Equipment 뽑기
     * @param address 뽑기 시도하는 Wallet 주소
     * @return Equipment 뽑기 결과
     * @throws WalletInsufficientTokenException Wallet에서 지급할 Token 부족
     */
    public EquipmentDrawTransactionResult drawEquipment(String address) throws WalletInsufficientTokenException {
        BigInteger balance = handleException(call(adminTokenDrawContract.balanceOf(address)));

        if(balance.compareTo(DRAW_COST) < 0)
            throw new WalletInsufficientTokenException(null);

        EthereumCall<TransactionReceipt> ec = call(adminEquipmentDrawContract.draw(address, seedGenerator(), seedGenerator()));

        if(ec.isSuccess()){
            TransactionReceipt tr = ec.getValue();
            EquipmentDrawContract.DrawResultEventResponse event = EquipmentDrawContract.getDrawResultEvents(tr).get(0);
            return new EquipmentDrawTransactionResult(tr.getTransactionHash(), event.power, event.item);
        }

        if(ec.getException() instanceof ERC20InsufficientBalanceException)
            throw new WalletInsufficientTokenException(ec.getException());
        throw ec.getException();
    }

    /**
     * 최근 뽑았던 Equipment 조회
     * @param address 조회할 Wallet 주소
     * @return Equipment 정보
     */
    public EquipmentDrawResult getDrawnEquipment(String address){
        Tuple2<BigInteger, BigInteger> tuple = handleException(call(adminEquipmentDrawContract.getDrawnEquipment(address)));
        return new EquipmentDrawResult(tuple.component1(), tuple.component2());
    }

    private BigInteger seedGenerator(){
        return BigInteger.valueOf((long) (Math.random()*Integer.MAX_VALUE));
    }
}
