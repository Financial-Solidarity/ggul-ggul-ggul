package com.ggul.application.chatting.application.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRequest {
    private UUID chattingRoomId;
    private String content;
}
