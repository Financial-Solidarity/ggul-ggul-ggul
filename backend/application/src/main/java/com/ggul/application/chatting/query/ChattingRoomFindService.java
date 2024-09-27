package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.CommonChatting;
import com.ggul.application.chatting.domain.repository.ChattingRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.ui.dto.ChattingRoomFindView;
import com.ggul.application.chatting.ui.dto.ChattingRoomInfoView;
import com.google.cloud.PageImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomFindService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final ChattingRepository chattingRepository;

    @Transactional(readOnly = true)
    public ChattingRoomFindView getChattingRoom(UUID challengeId, UUID sessionId) {
        ChallengeParticipant challengeParticipant = challengeParticipantRepository.findByChallenge_IdAndUser_Id(challengeId, sessionId).orElseThrow(ChallengeParticipantNotExistException::new);
        List<ChattingRoom> allByChallengeId = chattingRoomRepository.findAllByChallenge_Id(challengeId);

        return ChattingRoomFindView.builder().
                lobbyChattingRoomId(get(allByChallengeId, ChattingRoomType.LOBBY).getId())
                .myTeamChattingRoomId(challengeParticipant.getType().equals(ChallengeParticipantType.PERSONAL) ? null : get(allByChallengeId, challengeParticipant.getType().convertType()).getId())
                .totalChattingRoomId(get(allByChallengeId, ChattingRoomType.TOTAL).getId())
                .build();
    }

    @Transactional(readOnly = true)
    public ChattingRoomInfoView getChattingRoomInfo(UUID chattingRoomId, UUID sessionId) {
        ChattingRepository.ChattingBadgeCount chattingBadgeCount = chattingRepository.countByChattingRoomAndParticipantId(chattingRoomId, sessionId);
        Chatting chatting = chattingRepository.findFirstByChattingRoom_IdOrderByCreatedAtDesc(chattingRoomId);

        return ChattingRoomInfoView.builder().badge(chattingBadgeCount.getCount().intValue()).chattingRoomId(chattingRoomId)
                .lastChattingSendAt(chatting.getCreatedAt())
                .lastChattingContent(chatting.getType().equals(Chatting.Type.COMMON) ? ((CommonChatting) chatting).getContent() :
                        (chatting.getType().equals(Chatting.Type.JUSTIFICATION) ? "소명을 올렸습니다." : "소비내역을 올렸습니다."))
                .chattingRoomId(chattingRoomId)
                .build();
    }


    private ChattingRoom get(List<ChattingRoom> chattingRooms, ChattingRoomType type) {
        return chattingRooms.stream().filter(chattingRoom -> chattingRoom.getType().equals(type)).findFirst().get();
    }
}
