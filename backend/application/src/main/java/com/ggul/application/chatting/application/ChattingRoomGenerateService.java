package com.ggul.application.chatting.application;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomGenerateService {
    private final ChattingRoomRepository chattingRoomRepository;

    private final ChallengeRepository challengeRepository;

    @Transactional
    public UUID generateLobby(UUID challengeId) {
        Challenge challenge = challengeRepository.getReferenceById(challengeId);
        ChattingRoom generate = generate(challenge, ChattingRoomType.LOBBY);

        return generate.getId();
    }

    @Transactional
    public List<ChattingRoom> generateAll(Challenge challenge) {
        List<ChattingRoom> chattingRooms = new ArrayList<>();

        if(challenge.getCompetitionType().equals(CompetitionType.TEAM)) {
            ChattingRoom blue = generate(challenge, ChattingRoomType.BLUE);
            ChattingRoom red = generate(challenge, ChattingRoomType.RED);
            chattingRooms.add(blue);
            chattingRooms.add(red);
        }

        ChattingRoom total = generate(challenge, ChattingRoomType.TOTAL);
        chattingRooms.add(total);
        return chattingRooms;
    }

    private ChattingRoom generate(Challenge challenge, ChattingRoomType type) {
        return chattingRoomRepository.save(ChattingRoom.create(challenge, type));
    }
}
