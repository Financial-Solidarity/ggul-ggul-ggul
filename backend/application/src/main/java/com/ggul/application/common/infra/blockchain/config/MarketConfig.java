package com.ggul.application.common.infra.blockchain.config;

import com.ggul.application.market.infra.MarketContract;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.tx.gas.DefaultGasProvider;

@Getter
@Configuration
@RequiredArgsConstructor
public class MarketConfig {

    private final Web3jConfig web3jConfig;

    @Value("${blockchain.smart-contract.address.market}")
    private String contractAddress;

    @Bean
    public MarketContract adminMarketContract() {
        return MarketContract.load(
                contractAddress,
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
    }
}
