package com.ggul.application.equipment.application;

import com.ggul.application.common.infra.blockchain.EthereumCall;
import com.ggul.application.common.infra.blockchain.exception.ERC20InsufficientBalanceException;
import com.ggul.application.equipment.infra.EquipmentDrawContract;
import com.ggul.application.equipment.application.dto.EquipmentDrawResult;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import com.ggul.application.wallet.infra.TokenContract;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@RequiredArgsConstructor
public class EquipmentDrawService {

    private final Web3j web3j;

    private final TokenContract adminTokenContract;
    private final EquipmentDrawContract adminEquipmentDrawContract;
    private BigInteger DRAW_COST;

    @PostConstruct
    private void initialize() {
        DRAW_COST = handleException(call(adminEquipmentDrawContract.COST()));
    }

    /**
     * Equipment 뽑기
     * @param address 뽑기 시도하는 Wallet 주소
     * @return Equipment 뽑기 결과
     */
    public EquipmentDrawResult drawEquipment(String address) {
        BigInteger balance = handleException(call(adminTokenContract.balanceOf(address)));

        if(balance.compareTo(DRAW_COST) < 0)
            throw new WalletInsufficientTokenException();

        EthereumCall<TransactionReceipt> ec = call(adminEquipmentDrawContract.draw(address, seedGenerator(), seedGenerator()));

        if(ec.isSuccess()){
            TransactionReceipt tr = ec.getValue();
            return EquipmentDrawResult.of(tr.getTransactionHash(), EquipmentDrawContract.getDrawResultEvents(tr).get(0));
        }

        if(ec.getException() instanceof ERC20InsufficientBalanceException)
            throw new WalletInsufficientTokenException();
        throw ec.getException();
    }

    /**
     * Equipment 뽑기 결과 조회
     * @param transactionHash 조회할 transactionHash
     * @return Equipment 뽑기 결과
     */
    public EquipmentDrawResult getDrawResult(String transactionHash) {
        TransactionReceipt tr = handleException(call(web3j.ethGetTransactionReceipt(transactionHash))).getResult();
        return EquipmentDrawResult.of(tr.getTransactionHash(), EquipmentDrawContract.getDrawResultEvents(tr).get(0));
    }

    public Long getDrawCost(){
        return DRAW_COST.longValue();
    }

    private BigInteger seedGenerator(){
        return BigInteger.valueOf((long) (Math.random()*Integer.MAX_VALUE));
    }
}
