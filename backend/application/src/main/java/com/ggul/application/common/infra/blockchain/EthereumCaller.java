package com.ggul.application.common.infra.blockchain;

import com.ggul.application.common.infra.blockchain.exception.EthereumCallFailureException;
import org.web3j.protocol.core.RemoteFunctionCall;

public class EthereumCaller {

    public static <T> EthereumCall<T> call(RemoteFunctionCall<T> function) {
        try{
            return EthereumCall.success(function.send());
        } catch (Exception e) {
            return EthereumCall.fail(new EthereumCallFailureException(e));
        }
    }
}
