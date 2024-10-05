package com.ggul.application.chatting.ui;

import com.ggul.application.chatting.application.ChattingRegisterService;
import com.ggul.application.chatting.application.dto.ChatRequest;
import com.ggul.application.chatting.application.dto.JustificationChattingRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@RestController
public class ChattingWebSocketController {
    private final ChattingRegisterService chattingRegisterService;


    @MessageMapping("/{userId}")
    public void chatHandler(@DestinationVariable("userId") UUID userId, ChatRequest request) {
        log.info("front request chat : {}", request.toString());
        chattingRegisterService.chattingCreate(request, userId);
    }
}
