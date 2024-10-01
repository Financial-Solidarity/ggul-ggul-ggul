package com.ggul.application.common.infra.blockchain.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BlockchainUrlGenerator {

    public static String host;
    private static final String LOG_URL_FORMAT = "/tx/%s?tab=logs";

    @Value("${blockchain.scanner.host}")
    public void setHost(String host) {
        BlockchainUrlGenerator.host = host;
    }

    public static String logUrl(String transactionHash) {
        return host+String.format(LOG_URL_FORMAT, transactionHash);
    }
}