package com.ggul.application.challange.ui.dto;

import com.ggul.application.chatting.ui.dto.ChattingRoomInfoView;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ChallengeChattingView {
    private ChallengeView challenge;
    private ChattingRoomInfoView myTeamChattingRoom;
    private ChattingRoomInfoView lobbyChattingRoom;
    private ChattingRoomInfoView totalChattingRoom;
}
