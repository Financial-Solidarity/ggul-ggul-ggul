package com.ggul.application.equipment.ui;

import com.ggul.application.common.util.ListUtils;
import com.ggul.application.equipment.application.EquipmentService;
import com.ggul.application.equipment.application.dto.EquipmentInfo;
import com.ggul.application.equipment.application.dto.TokenizedEquipmentInfo;
import com.ggul.application.equipment.ui.request.EquipmentEquipRequest;
import com.ggul.application.equipment.ui.request.EquipmentMintRequest;
import com.ggul.application.equipment.ui.request.EquipmentRemoveRequest;
import com.ggul.application.equipment.ui.request.EquipmentUnequipRequest;
import com.ggul.application.equipment.ui.response.EquipmentResponse;
import com.ggul.application.equipment.ui.response.TokenizedEquipmentResponse;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<?> getEquipments(@AuthenticationPrincipal UserLoginContext context,
                                           @RequestParam("min-power") Long minPower,
                                           @RequestParam("max-power") Long maxPower) {
        List<TokenizedEquipmentInfo> infos = equipmentService.getEquipments(context.getUserId(), minPower, maxPower);
        return ResponseEntity.ok(ListUtils.applyFunctionToElements(infos, TokenizedEquipmentResponse::from));
    }

    @GetMapping("/equipped")
    public ResponseEntity<?> getEquippedEquipment(@AuthenticationPrincipal UserLoginContext context){
        TokenizedEquipmentInfo info = equipmentService.getEquippedEquipment(context.getUserId());
        return ResponseEntity.ok(TokenizedEquipmentResponse.from(info));
    }

    @PutMapping("/equip")
    public ResponseEntity<?> equipEquipment(@AuthenticationPrincipal UserLoginContext context,
                                            @RequestBody EquipmentEquipRequest request){
        equipmentService.equipEquipment(context.getUserId(), request.getIpfsCID());
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/unequip")
    public ResponseEntity<?> unequipEquipment(@AuthenticationPrincipal UserLoginContext context,
                                              @RequestBody EquipmentUnequipRequest request){
        equipmentService.unequipEquipment(context.getUserId(), request.getIpfsCID());
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeEquipment(@AuthenticationPrincipal UserLoginContext context,
                                             @RequestBody EquipmentRemoveRequest request){
        equipmentService.removeEquipment(context.getUserId(), request.getIpfsCID());
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/names")
    public ResponseEntity<?> getEquipmentNames(){
        return ResponseEntity.ok().body(equipmentService.getEquipmentNames());
    }
}
