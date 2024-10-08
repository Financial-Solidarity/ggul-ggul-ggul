package com.ggul.application.chatting.ui.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChattingRoomFindView {
    private UUID totalChattingRoomId;
    private UUID myTeamChattingRoomId;
    private UUID lobbyChattingRoomId;
}
