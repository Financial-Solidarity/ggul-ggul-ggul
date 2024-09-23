package com.ggul.application.challange.application;

import com.ggul.application.challange.domain.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChallengeRemoveService {
    private final ChallengeRepository challengeRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void removeChallenge(UUID id) {
        log.info("challenge 삭제 : {}" , id);
        challengeRepository.deleteById(id);
    }
}
