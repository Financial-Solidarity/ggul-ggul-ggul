package com.ggul.application.common.infra.blockchain.config;

import com.ggul.application.application.infra.ApplicationContract;
import com.ggul.application.equipment.infra.EquipmentDrawContract;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.tx.gas.DefaultGasProvider;

@Getter
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final Web3jConfig web3jConfig;

    @Value("${blockchain.smart-contract.address.application}")
    private String contractAddress;

    @Bean
    public ApplicationContract adminApplicationContract() {
        return ApplicationContract.load(
                contractAddress,
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
    }
}
