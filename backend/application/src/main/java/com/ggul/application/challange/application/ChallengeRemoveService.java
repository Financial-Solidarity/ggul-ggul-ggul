package com.ggul.application.challange.application;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.query.dto.ChallengeDestroyedEvent;
import com.ggul.application.common.event.Events;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChallengeRemoveService {
    private final ChallengeRepository challengeRepository;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void removeChallenge(UUID id) {
        Optional<Challenge> byId = challengeRepository.findById(id);
        if(byId.isPresent()) {
            log.info("challenge 삭제 : {}" , id);
            byId.get().delete();
            Events.raise(new ChallengeDestroyedEvent(id));
        }
    }
}
