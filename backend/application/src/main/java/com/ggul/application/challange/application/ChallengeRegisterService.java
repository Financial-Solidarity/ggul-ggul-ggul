package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeRegisterService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    @Transactional
    public UUID createChallenge(ChallengeRegisterRequest request, UUID userId) {
        Challenge createChallenge = Challenge.createChallengeRoom(request, userRepository.getReferenceById(userId));
        challengeRepository.save(createChallenge);

        // TODO : 채팅방 생성 로직 기능 필요.
        return createChallenge.getId();
    }
}
