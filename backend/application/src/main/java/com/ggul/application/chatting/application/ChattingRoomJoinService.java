package com.ggul.application.chatting.application;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.exception.ChattingRoomParticipantExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomJoinService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Transactional
    public UUID join(UUID chattingRoomId, UUID participantId) {
        if(chattingRoomParticipantRepository.existsByChattingRoom_IdAndChallengeParticipant_Id(chattingRoomId, participantId)) {
            throw new ChattingRoomParticipantExistException();
        }
        ChattingRoom chattingRoom = chattingRoomRepository.findById(chattingRoomId).orElse(null);

        ChattingRoomParticipant join = chattingRoom.join(challengeParticipantRepository.getReferenceById(participantId));
        return chattingRoomParticipantRepository.save(join).getId();
    }

    @Transactional
    public void joinAll(ChattingRoom chattingRoom, List<ChallengeParticipant> participantList) {
        List<ChattingRoomParticipant> chattingRoomParticipants = participantList.stream().map(chattingRoom::join).toList();
        chattingRoomParticipantRepository.saveAll(chattingRoomParticipants);
    }
}
