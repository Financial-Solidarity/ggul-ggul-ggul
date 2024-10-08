package com.ggul.application.common.infra.blockchain;

import com.ggul.application.common.infra.blockchain.exception.EthereumCallFailureException;
import com.ggul.application.common.infra.blockchain.exception.ERC721InvalidSenderException;
import com.ggul.application.common.infra.blockchain.exception.ERC20InsufficientBalanceException;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.Response;

public class EthereumCaller {

    public static <T> EthereumCall<T> call(RemoteFunctionCall<T> function) {
        try{
            return EthereumCall.success(function.send());
        } catch (Exception e) {
            if(e.getMessage().contains("ERC20InsufficientBalance"))
                return EthereumCall.fail(new ERC20InsufficientBalanceException());
            else if (e.getMessage().contains("ERC721InvalidSender"))
                return EthereumCall.fail(new ERC721InvalidSenderException());
            return EthereumCall.fail(new EthereumCallFailureException());
        }
    }

    public static <S, T extends Response> EthereumCall<T> call(Request<S, T> request) {
        try{
            return EthereumCall.success(request.send());
        } catch (Exception e){
            return EthereumCall.fail(new EthereumCallFailureException());
        }
    }
}
