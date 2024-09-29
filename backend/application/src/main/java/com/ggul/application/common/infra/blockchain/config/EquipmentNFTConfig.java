package com.ggul.application.common.infra.blockchain.config;

import com.ggul.application.equipment.infra.EquipmentNFTContract;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.tx.gas.DefaultGasProvider;

@Configuration
@RequiredArgsConstructor
public class EquipmentNFTConfig {

    private final Web3jConfig web3jConfig;

    @Value("${blockchain.smart-contract.address.equipment-nft}")
    private String contractAddress;

    @Bean
    public EquipmentNFTContract adminEquipmentNFTContract() {
        return EquipmentNFTContract.load(
                contractAddress,
                web3jConfig.web3j(),
                web3jConfig.adminCredentials(),
                new DefaultGasProvider()
        );
    }
}
