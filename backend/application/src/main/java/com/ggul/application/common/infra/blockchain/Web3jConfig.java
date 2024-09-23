package com.ggul.application.common.infra.blockchain;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Getter
@Configuration
public class Web3jConfig {
    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(host));
    }

    @Value("${blockchain.admin.wallet.address}")
    private String address;

    @Value("${blockchain.admin.wallet.private-key}")
    private String privateKey;

    @Value("${blockchain.network.host}")
    private String host;

    @Bean
    public Credentials adminCredentials() {
        return Credentials.create(privateKey);
    }
}
