package com.ggul.application.wallet.application;

import com.ggul.application.user.domain.User;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.exception.WalletGenerateFailException;
import org.springframework.stereotype.Service;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Keys;

@Service
public class WalletGenerateService {

    /**
     * 지갑 Entity 생성
     * @param user User entity
     * @return Wallet transient entity
     */
    public Wallet generatorWallet(User user) {
        ECKeyPair keyPair = null;
        try {
            keyPair = Keys.createEcKeyPair();
        } catch (Exception e){
            throw new WalletGenerateFailException();
        }
        String address = Keys.getAddress(keyPair);
        String privateKey = keyPair.getPrivateKey().toString(16);
        return Wallet.builder()
                .user(user)
                .address(address)
                .privateKey(privateKey)
                .build();
    }
}
