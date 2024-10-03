package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.repository.ChattingRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.ui.dto.ChattingRoomFindView;
import com.ggul.application.chatting.ui.dto.ChattingRoomInfoView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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
                lobbyChattingRoomId(get(allByChallengeId, ChattingRoomType.LOBBY).orElseGet(ChattingRoom::new).getId())
                .myTeamChattingRoomId(challengeParticipant.getType().equals(ChallengeParticipantType.PERSONAL) ? null : get(allByChallengeId, challengeParticipant.getType().convertType()).orElseGet(ChattingRoom::new).getId())
                .totalChattingRoomId(get(allByChallengeId, ChattingRoomType.TOTAL).orElseGet(ChattingRoom::new).getId())
                .build();
    }

    @Transactional(readOnly = true)
    public ChattingRoomInfoView getChattingRoomInfo(UUID chattingRoomId, UUID sessionId) {
        ChattingRepository.ChattingBadgeCount chattingBadgeCount = chattingRepository.countByChattingRoomAndParticipantId(chattingRoomId, sessionId);
        Optional<Chatting> chatting = chattingRepository.findFirstByChattingRoom_IdOrderByCreatedAtDesc(chattingRoomId);


        if(chatting.isPresent()) {
            Chatting target = chatting.get();
            return ChattingRoomInfoView.builder().badge(chattingBadgeCount.getCount().intValue()).chattingRoomId(chattingRoomId)
                    .lastChattingSendAt(target.getCreatedAt())
                    .lastChattingContent(target.getType().equals(Chatting.Type.COMMON) ? target.getContent() :
                            (target.getType().equals(Chatting.Type.JUSTIFICATION) ? "소명을 올렸습니다." : "소비내역을 올렸습니다."))
                    .chattingRoomId(chattingRoomId)
                    .build();
        }else {
            return ChattingRoomInfoView.builder().badge(chattingBadgeCount.getCount().intValue()).chattingRoomId(chattingRoomId)
                    .lastChattingSendAt(null)
                    .lastChattingContent(null)
                    .chattingRoomId(chattingRoomId)
                    .build();
        }


    }


    private Optional<ChattingRoom> get(List<ChattingRoom> chattingRooms, ChattingRoomType type) {
        return chattingRooms.stream().filter(chattingRoom -> chattingRoom.getType().equals(type)).findFirst();
    }
}
