package com.ggul.application.challange.application.schedule;

import com.ggul.application.challange.application.ChallengeStateUpdateService;
import com.ggul.application.challange.domain.Challenge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChallengeScheduler {
    private final Map<UUID, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();
    private final ChallengeStateUpdateService challengeStateUpdateService;
    private final TaskScheduler taskScheduler;

    public void startRegister(Challenge challenge) {
        log.info("{}", taskScheduler);
        ScheduledFuture<?> task = taskScheduler.schedule(() -> {
          challengeStateUpdateService.challengeStateUpdateToStartOrDestroyed(challenge.getId());
        }, challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
        log.info("{}", challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
        scheduledTasks.put(challenge.getId(), task);
    }

    public void remove(UUID challengeId) {
        scheduledTasks.get(challengeId).cancel(true);
    }
}
