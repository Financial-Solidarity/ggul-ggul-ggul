package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.ui.dto.ChattingRoomFindView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomFindService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;

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



    private ChattingRoom get(List<ChattingRoom> chattingRooms, ChattingRoomType type) {
        return chattingRooms.stream().filter(chattingRoom -> chattingRoom.getType().equals(type)).findFirst().get();
    }
}
