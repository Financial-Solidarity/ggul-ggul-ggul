package com.ggul.application.backdoor.equipment;

import com.ggul.application.backdoor.equipment.in.EquipmentDrawRequestBD;
import com.ggul.application.equipment.application.EquipmentDrawService;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletInsufficientTokenException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/backdoor/equipments")
@AllArgsConstructor
public class EquipmentBackdoor {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final EquipmentDrawService equipmentDrawService;


    @PostMapping("/draw")
    public ResponseEntity<?> draw(@RequestBody EquipmentDrawRequestBD request) {
        User user = userRepository.findByUsername(request.getEmail()).orElseThrow(() -> new RuntimeException("사용자 없음"));
        Wallet wallet = walletRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("지갑 없음"));
        try{
            return ResponseEntity.ok().body(equipmentDrawService.drawEquipment(wallet.getAddress()));
        } catch (WalletInsufficientTokenException e) {
            return ResponseEntity.badRequest().body("토큰 부족");
        }
    }
}
