package com.ggul.application.chatting.application.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JustificationChattingRequest {
    private UUID chattingId;
    private String content;
}
