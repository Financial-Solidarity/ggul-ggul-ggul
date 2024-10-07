package com.ggul.application.user.application;

import com.ggul.application.challange.application.dto.ChallengeExitRequest;
import com.ggul.application.challange.application.ChallengeExitService;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class SignoutService {
    private final UserRepository userRepository;
    private final ChallengeExitService challengeExitService;
    private final ChallengeRepository challengeRepository;

    @Transactional
    public void signout(UUID userId) {
        User referenceById = userRepository.getReferenceById(userId);
        List<Challenge> allByUserId = challengeRepository.findAllByUserId(userId);
        allByUserId.forEach(challenge -> challengeExitService.challengeExit(new ChallengeExitRequest(challenge.getId()), userId));
        referenceById.delete();
    }
}
