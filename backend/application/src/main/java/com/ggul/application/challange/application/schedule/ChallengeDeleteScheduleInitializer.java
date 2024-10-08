package com.ggul.application.challange.application.schedule;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ChallengeDeleteScheduleInitializer implements ApplicationListener<ContextRefreshedEvent> {
    private final ChallengeScheduler challengeScheduler;
    private final ChallengeRepository challengeRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        List<Challenge> challenges = challengeRepository.findAllByIsReadyAndIsDeleted(false, false);
        System.out.println(Arrays.toString(challenges.toArray()));
        challenges.forEach(challengeScheduler::startRegister);
    }
}
