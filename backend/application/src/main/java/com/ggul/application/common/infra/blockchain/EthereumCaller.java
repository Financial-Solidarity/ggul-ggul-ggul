package com.ggul.application.common.infra.blockchain;

import com.ggul.application.common.infra.blockchain.exception.EthereumCallFailureException;
import com.ggul.application.equipment.infra.exception.ERC721InvalidSenderException;
import com.ggul.application.wallet.infra.exception.ERC20InsufficientBalanceException;
import org.web3j.protocol.core.RemoteFunctionCall;

public class EthereumCaller {

    public static <T> EthereumCall<T> call(RemoteFunctionCall<T> function) {
        try{
            return EthereumCall.success(function.send());
        } catch (Exception e) {
            if(e.getMessage().contains("ERC20InsufficientBalance"))
                return EthereumCall.fail(new ERC20InsufficientBalanceException(e));
            else if (e.getMessage().contains("ERC721InvalidSender"))
                return EthereumCall.fail(new ERC721InvalidSenderException(e));
            return EthereumCall.fail(new EthereumCallFailureException(e));
        }
    }
}
