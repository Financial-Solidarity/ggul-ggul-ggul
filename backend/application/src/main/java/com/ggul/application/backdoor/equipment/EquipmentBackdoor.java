package com.ggul.application.backdoor.equipment;

import com.ggul.application.backdoor.equipment.in.EquipmentDrawRequestBD;
import com.ggul.application.backdoor.equipment.in.EquipmentNFTMintRequestBD;
import com.ggul.application.common.infra.ipfs.upload.IPFSJsonUploader;
import com.ggul.application.common.infra.ipfs.upload.IPFSResponse;
import com.ggul.application.equipment.application.EquipmentDrawService;
import com.ggul.application.equipment.application.EquipmentNFTService;
import com.ggul.application.equipment.exception.NFTOwnerAlreadyExistsException;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/backdoor/equipments")
@AllArgsConstructor
public class EquipmentBackdoor {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final EquipmentDrawService equipmentDrawService;
    private final EquipmentNFTService equipmentNFTService;
    private final IPFSJsonUploader ipfsJsonUploader;

    @PostMapping("/draw")
    public ResponseEntity<?> draw(@RequestBody EquipmentDrawRequestBD request) {
        User user = userRepository.findByUsername(request.getEmail()).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findByUser(user).orElseThrow(() -> new RuntimeException("지갑 없음"));
        try {
            return ResponseEntity.ok().body(equipmentDrawService.drawEquipment(wallet.getAddress()));
        } catch (WalletInsufficientTokenException e) {
            return ResponseEntity.badRequest().body("토큰 부족");
        }
    }

    @GetMapping("/users/{email}/drawn")
    public ResponseEntity<?> getDrawn(@PathVariable String email) {
        User user = userRepository.findByUsername(email).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findByUser(user).orElseThrow(() -> new RuntimeException("지갑 없음"));
        return ResponseEntity.ok().body(equipmentDrawService.getDrawnEquipment(wallet.getAddress()));
    }

    @PostMapping("/issue")
    public ResponseEntity<?> mintNFT(@RequestBody EquipmentNFTMintRequestBD request) {
        User user = userRepository.findByUsername(request.getEmail()).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findByUser(user).orElseThrow(() -> new RuntimeException("지갑 없음"));

        IPFSResponse response = ipfsJsonUploader.upload("metadata.json", wallet);
        try {
            return ResponseEntity.ok().body(equipmentNFTService.mintNFT(wallet.getAddress(), response.getHash()));
        } catch (WalletInsufficientTokenException e1) {
            return ResponseEntity.badRequest().body("토큰 부족");
        } catch (NFTOwnerAlreadyExistsException e2) {
            return ResponseEntity.badRequest().body("이미 소유자가 있는 NFT");
        }
    }
}
