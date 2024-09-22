package com.ggul.application.chatting.application;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomGenerateService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChattingRoomJoinService chattingRoomJoinService;
    private final ChallengeRepository challengeRepository;

    @Transactional
    public UUID generateLobby(UUID challengeId) {
        Challenge challenge = challengeRepository.getReferenceById(challengeId);
        ChattingRoom generate = generate(challenge, ChattingRoomType.Type.LOBBY);

        chattingRoomJoinService.chattingRoomJoin(generate.getId(), challenge.getOwner().getId());
        return generate.getId();
    }

    private ChattingRoom generate(Challenge challenge, ChattingRoomType.Type type) {
        return chattingRoomRepository.save(ChattingRoom.create(challenge, type));
    }
}
