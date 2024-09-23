package com.ggul.application.challange.application.schedule;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ChallengeDeleteScheduleInitializer implements ApplicationListener<ContextRefreshedEvent> {
    private final ChallengeDeleteScheduler challengeDeleteScheduler;
    private final ChallengeRepository challengeRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        List<Challenge> challenges = challengeRepository.findAllByIsStarted(false);
        System.out.println(Arrays.toString(challenges.toArray()));
        challenges.forEach(challengeDeleteScheduler::register);
    }
}
