package com.ggul.application.challange.application.schedule;

import com.ggul.application.challange.application.ChallengeRemoveService;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.query.ChallengeFindService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@RequiredArgsConstructor
@Component
@Slf4j
public class ChallengeDeleteScheduler {
    private final Map<UUID, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();
    private final ChallengeRemoveService challengeRemoveService;
    private final TaskScheduler taskScheduler;

    public void register(Challenge challenge) {
        log.info("{}", taskScheduler);
        ScheduledFuture<?> task = taskScheduler.schedule(() -> {
          challengeRemoveService.removeChallenge(challenge.getId());
        }, challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
        log.info("{}", challenge.getStartedAt().atZone(ZoneId.systemDefault()).toInstant());
        scheduledTasks.put(challenge.getId(), task);
    }

    public void remove(UUID challengeId) {
        scheduledTasks.get(challengeId).cancel(true);
    }
}
