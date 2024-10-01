package com.ggul.application.chatting.ui;

import com.ggul.application.chatting.application.ChattingRegisterService;
import com.ggul.application.chatting.application.dto.JustificationChattingRequest;
import com.ggul.application.chatting.query.ChattingFindService;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
public class ChattingController {
    private final ChattingRegisterService chattingRegisterService;
    private final ChattingFindService chattingFindService;

    @PostMapping("/justification")
    public ResponseEntity<?> justificationChatAdd(@RequestBody JustificationChattingRequest request, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        chattingRegisterService.justificationChattingCreate(request, userLoginContext.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{chattingRoomId}/before")
    public ResponseEntity<?> chattingBeforeList(@PathVariable UUID chattingRoomId, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(chattingFindService.findAllByBefore(userLoginContext.getUserId(), chattingRoomId));
    }

    @GetMapping("/{chattingRoomId}/after")
    public ResponseEntity<?> chattingAfterList(@PathVariable UUID chattingRoomId, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(chattingFindService.findAllByAfter(userLoginContext.getUserId(), chattingRoomId));
    }
}
