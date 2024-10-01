package com.ggul.application.equipment.ui;

import com.ggul.application.equipment.application.EquipmentService;
import com.ggul.application.equipment.application.dto.EquipmentInfo;
import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.equipment.ui.request.EquipmentMintRequest;
import com.ggul.application.equipment.ui.response.EquipmentResponse;
import com.ggul.application.equipment.ui.response.TokenizedEquipmentResponse;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipments")
@AllArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    @PostMapping("/draw")
    public ResponseEntity<?> drawEquipment(@AuthenticationPrincipal UserLoginContext context) {
        EquipmentInfo info = equipmentService.drawEquipment(context.getUserId());
        return ResponseEntity.ok(EquipmentResponse.from(info));
    }

    @PostMapping("/mint")
    public ResponseEntity<?> mintEquipment(@AuthenticationPrincipal UserLoginContext context,
                                           @RequestBody EquipmentMintRequest request) {
        TokenizedEquipmentInfo info = equipmentService.mintEquipment(context.getUserId(), request.getTransactionHash());
        return ResponseEntity.ok(TokenizedEquipmentResponse.from(info));
    }
}
