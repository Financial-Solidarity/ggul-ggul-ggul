package com.ggul.application.application.application;

import com.ggul.application.application.application.dto.ApplicationRegisterResult;
import com.ggul.application.application.exception.ApplicationProbabilityOutOfBoundsException;
import com.ggul.application.application.infra.ApplicationContract;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.math.BigInteger;

import static com.ggul.application.common.infra.blockchain.EthereumCallExceptionHandler.handleException;
import static com.ggul.application.common.infra.blockchain.EthereumCaller.call;

@Service
@AllArgsConstructor
public class ApplicationRegisterService {

    private final ApplicationContract adminApplicationContract;

    /**
     * 응모 등록
     * @param maxWinnerCount 응모 총 당첨자 수
     * @param probability 응모 확률
     * @param price 응모 가격
     * @return 응모 등록 결과
     */
    public ApplicationRegisterResult registerApplication(Long maxWinnerCount, Double probability, Long price) {
        if(probability <= 0  ||  probability > 1)
            throw new ApplicationProbabilityOutOfBoundsException();

        long[] probabilitySplit = splitProbability(probability);

        TransactionReceipt tr = handleException(call(adminApplicationContract.register(BigInteger.valueOf(maxWinnerCount),
                BigInteger.valueOf(probabilitySplit[0]),
                BigInteger.valueOf(probabilitySplit[1]),
                BigInteger.valueOf(price))));

        ApplicationContract.ApplicationRegisterResultEventResponse response = ApplicationContract.getApplicationRegisterResultEvents(tr).get(0);
        return ApplicationRegisterResult.of(tr.getTransactionHash(), response);
    }

    private long[] splitProbability(Double probability) {
        String[] div = String.valueOf(probability).split("\\.");
        long probabilityNume = Long.parseLong(div[1]);
        long probabilityDeno = (long) Math.pow(10, div[1].length());
        return new long[]{probabilityNume, probabilityDeno};
    }
}
