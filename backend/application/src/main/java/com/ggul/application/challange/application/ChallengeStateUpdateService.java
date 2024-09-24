package com.ggul.application.challange.application;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeDestroyedEvent;
import com.ggul.application.challange.event.ChallengeStartedEvent;
import com.ggul.application.common.event.Events;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChallengeStateUpdateService {
    private final ChallengeRepository challengeRepository;
    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void challengeStateUpdate(UUID id) {
        Optional<Challenge> byId = challengeRepository.findById(id);
        if(byId.isPresent()) {
            //시작 준비가 안된 경우 => isReady
            Challenge target = byId.get();
            if(!target.getIsReady()) {
                target.delete();
                Events.raise(new ChallengeDestroyedEvent(id));
            }else {
                Events.raise(new ChallengeStartedEvent(id));
            }
        }
    }
}
