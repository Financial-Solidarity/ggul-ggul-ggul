package com.ggul.application.backdoor.ipfs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ggul.application.common.infra.ipfs.upload.IPFSJsonUploader;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/backdoor/ipfs")
@AllArgsConstructor
public class IPFSBackdoor {

    private final IPFSJsonUploader ipfsJsonUploader;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    @PostMapping("/upload")
    public ResponseEntity<?> draw() {
        User user = userRepository.findByUsername("khj745700@naver.com").orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findByUser(user).orElseThrow(() -> new RuntimeException("지갑 없음"));
        return ResponseEntity.ok(ipfsJsonUploader.upload("data.json", wallet));
    }
}
