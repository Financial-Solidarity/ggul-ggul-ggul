package com.ggul.application.challange.application.schedule;

import com.ggul.application.challange.event.ChallengeStartedEvent;
import com.ggul.application.challange.handler.ChallengeStateUpdateService;
import com.ggul.application.challange.domain.Challenge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.concurrent.ScheduledFuture;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChallengeScheduler {
    private final ChallengeStateUpdateService challengeStateUpdateService;
    private final TaskScheduler taskScheduler;

    public void startRegister(Challenge challenge) {
        ScheduledFuture<?> task = taskScheduler.schedule(() -> {
          challengeStateUpdateService.challengeStateUpdateToStartOrDestroyed(challenge.getId());
        }, challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
        log.info("challenge start Register Check Handler Add : {}, time : {} ",challenge.getId(), challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
    }

    @Async
    @EventListener
    public void endRegister(ChallengeStartedEvent event) {
        ScheduledFuture<?> task = taskScheduler.schedule(() -> {
            challengeStateUpdateService.challengeEndUpdate(event.getChallengeId());
        }, event.getEndTime().atZone(ZoneId.systemDefault()).toInstant());
        log.info("challenge end Register Check Handler Add : {}, time : {}",event.getChallengeId(), event.getEndTime().atZone(ZoneId.systemDefault()).toInstant());
    }

}
