package com.ggul.application.common.infra.blockchain.config;

import com.ggul.application.wallet.infra.TokenContract;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.tx.gas.DefaultGasProvider;

@Getter
@Configuration
@RequiredArgsConstructor
public class TokenConfig {

    private final Web3jConfig web3jConfig;

    @Value("${blockchain.smart-contract.address.token}")
    private String contractAddress;

    @Bean
    public TokenContract adminTokenContract() {
        return TokenContract.load(
                contractAddress,
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
    }
}