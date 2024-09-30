package com.ggul.application.common.infra.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class WebsocketSender {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;


    public void send(UUID userId, String type, Object dto) {
        Request request = new Request(type, dto);
        HashMap<String, Object> requestBody = converter(request);

        messagingTemplate.convertAndSend("/sub/" + userId, requestBody);
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
