package com.ggul.application.common.infra.ipfs.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@RequiredArgsConstructor
public class IPFSConfig {

    @Value("${ipfs.host}")
    private String host;

    @Value("${ipfs.port.api}")
    private Integer apiPort;

    @Value("${ipfs.port.gateway}")
    private Integer gatewayPort;
}
