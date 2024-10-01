package com.ggul.application.chatting.ui;

import com.ggul.application.chatting.application.ChattingRegisterService;
import com.ggul.application.chatting.application.dto.JustificationChattingRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
public class ChattingController {
    private final ChattingRegisterService chattingRegisterService;


    @PostMapping("/justification")
    public ResponseEntity<?> justificationChatAdd(@RequestBody JustificationChattingRequest request, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        chattingRegisterService.justificationChattingCreate(request, userLoginContext.getUserId());
        return ResponseEntity.ok().build();
    }
}
