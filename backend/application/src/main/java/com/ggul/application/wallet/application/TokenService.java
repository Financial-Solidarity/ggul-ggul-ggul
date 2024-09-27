package com.ggul.application.wallet.application;

import com.ggul.application.common.infra.blockchain.EthereumCall;
import com.ggul.application.common.infra.blockchain.config.Web3jConfig;
import com.ggul.application.wallet.exception.ContractInsufficientTokenException;
import com.ggul.application.wallet.exception.TokenGrantFailureException;
import com.ggul.application.wallet.infra.TokenContract;
import com.ggul.application.wallet.infra.exception.ERC20InsufficientBalanceException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@AllArgsConstructor
public class TokenService {

    private final Web3jConfig web3jConfig;
    private final TokenContract adminTokenContract;

    /**
     * Token 발행
     * @param quantity 발행할 Token 수량
     * @return 트랜잭션 Hash
     */
    public String generateTokens(BigInteger quantity) {
        EthereumCall<TransactionReceipt> ec = call(adminTokenContract.mint(quantity));
        return handleException(ec).getTransactionHash();
    }

    /**
     * 지갑 Token 잔액 조회
     * @param address 조회할 Wallet 주소
     * @return 지갑 Token 잔액
     */
    public BigInteger getBalance(String address) {
        EthereumCall<BigInteger> ec = call(adminTokenContract.balanceOf(address));
        return handleException(ec);
    }

    /**
     * Token 지급
     * @param receiverAddress 지급할 Wallet 주소
     * @param quantity 지급할 Token 수량
     * @return 트랜잭션 Hash
     * @throws ContractInsufficientTokenException Contract에서 지급할 Token 부족
     */
    public String grantTokens(String receiverAddress, BigInteger quantity) throws ContractInsufficientTokenException {
        if(getUnusedTokens().compareTo(quantity) < 0)
            throw new ContractInsufficientTokenException(null);

        EthereumCall<TransactionReceipt> ec = call(adminTokenContract.transfer(receiverAddress, quantity));
        if(ec.isSuccess())
            return ec.getValue().getTransactionHash();

        if(ec.getException() instanceof ERC20InsufficientBalanceException)
            throw new ContractInsufficientTokenException(ec.getException());
        throw new TokenGrantFailureException(ec.getException());
    }

    private BigInteger getUnusedTokens() {
        EthereumCall<BigInteger> ec = call(adminTokenContract.balanceOf(web3jConfig.getAddress()));
        return handleException(ec);
    }
}