package com.ggul.application.application.application;

import com.ggul.application.application.application.dto.ApplicationApplyResult;
import com.ggul.application.application.domain.Application;
import com.ggul.application.application.infra.ApplicationContract;
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
public class ApplicationApplyService {

    private final ApplicationContract adminApplicationContract;
    private final TokenService tokenService;

    /**
     * 응모 실행
     * @param address 응모할 지갑 Address
     * @param application 응모할 Application
     * @return 응모 결과
     */
    public ApplicationApplyResult applyApplication(String address, Application application){
        if(tokenService.getBalance(address).longValue() < application.getPrice())
            throw new WalletInsufficientTokenException();

        TransactionReceipt tr = handleException(call(adminApplicationContract.enter(address, BigInteger.valueOf(application.getId()), seedGenerator())));
        ApplicationContract.EnterResultEventResponse response = ApplicationContract.getEnterResultEvents(tr).get(0);
        return ApplicationApplyResult.of(tr.getTransactionHash(), response);
    }

    /**
     * 응모 결과 검증
     * @param address 응모 조회할 지갑 Address
     * @param application 조회할 Application
     * @return 당첨 여부
     */
    public boolean verifyApplication(String address, Application application){
        return handleException(call(adminApplicationContract.verifyWinner(address, BigInteger.valueOf(application.getId()))));
    }

    private BigInteger seedGenerator(){
        return BigInteger.valueOf((long) (Math.random()*Integer.MAX_VALUE));
    }
}
