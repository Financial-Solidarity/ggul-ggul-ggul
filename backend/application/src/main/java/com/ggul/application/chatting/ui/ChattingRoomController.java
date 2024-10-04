package com.ggul.application.chatting.ui;

import com.ggul.application.chatting.query.ChattingRoomFindService;
import com.ggul.application.chatting.ui.dto.ChattingRoomFindView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/challenges")
@RestController
public class ChattingRoomController {
    private final ChattingRoomFindService chattingRoomFindService;

    @GetMapping("/{challengeId}/chatting-room")
    public ResponseEntity<?> getChattingRooms(@PathVariable(name = "challengeId") UUID challengeId, @AuthenticationPrincipal UserLoginContext context) {
        ChattingRoomFindView chattingRoom = chattingRoomFindService.getChattingRoom(challengeId, context.getUserId());
        return ResponseEntity.ok(chattingRoom);
    }
}
