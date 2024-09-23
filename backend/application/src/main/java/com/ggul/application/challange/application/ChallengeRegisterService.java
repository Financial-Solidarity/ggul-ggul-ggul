package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.challange.application.schedule.ChallengeDeleteScheduler;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.ui.dto.ChallengeCreateView;
import com.ggul.application.chatting.application.ChattingRoomGenerateService;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeRegisterService {
    private final ChallengeRepository challengeRepository;
    private final ChattingRoomGenerateService chattingRoomGenerateService;
    private final ChallengeJoinService challengeJoinService;
    private final ChallengeDeleteScheduler challengeDeleteScheduler;
    private final UserRepository userRepository;

    @Transactional
    public ChallengeCreateView createChallenge(ChallengeRegisterRequest request, UUID userId) {
        //TODO : 현재 챌린지 참여시 참여중인 챌린지가 있는지 검증하는 로직 추가.
        Challenge createChallenge = Challenge.createChallengeRoom(request, userRepository.getReferenceById(userId));
        challengeRepository.save(createChallenge);

        challengeJoinService.join(createChallenge.getId(), userId, createChallenge.getPassword());
        UUID chattingRoomId = chattingRoomGenerateService.generateLobby(createChallenge.getId());
        challengeDeleteScheduler.register(createChallenge);
        return ChallengeCreateView.builder().challengeId(createChallenge.getId()).lobbyChattingRoomId(chattingRoomId).build();
    }
}
