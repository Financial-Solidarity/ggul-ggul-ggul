package com.ggul.application.chatting.ui.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ChattingRoomInfoView {
    private UUID chattingRoomId;
    private String lastChattingContent;
    private LocalDateTime lastChattingSendAt;
    private Integer badge;
}
