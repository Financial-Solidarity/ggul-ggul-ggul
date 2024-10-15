package com.ggul.application.common.infra.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebsocketSender {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;


    public void send(UUID userId, String type, Object dto) {
        Request request = new Request(type, dto);
        HashMap<String, Object> requestBody = converter(request);

        try{
            messagingTemplate.convertAndSend("/sub/" + userId, requestBody);
        } catch (MessagingException e) {
            log.info("message send error : {}", e.getMessage());
        }
    }

    @Getter
    @AllArgsConstructor
    private static class Request {
        private String type;
        private Object data;
    }

    private HashMap<String, Object> converter(Object dto) {
        return objectMapper.convertValue(dto, HashMap.class);
    }
}
