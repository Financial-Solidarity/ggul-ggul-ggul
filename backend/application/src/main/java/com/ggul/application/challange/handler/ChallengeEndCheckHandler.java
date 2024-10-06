package com.ggul.application.challange.handler;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeEndedEvent;
import com.ggul.application.common.event.Events;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.event.PaymentCompletedEvent;
import com.ggul.application.payment.query.ConsumptionLogFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChallengeEndCheckHandler {
    private final ConsumptionLogFindService consumptionLogFindService;
    private final ChallengeRepository challengeRepository;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void challengeEndCheckByPayment(PaymentCompletedEvent event) {
        Optional<Challenge> byIsEndedFalse = challengeRepository.findByIsEndedFalse(event.getUserId());

        if (byIsEndedFalse.isEmpty()) {
            return;
        }

        Challenge target = byIsEndedFalse.get();

        List<ConsumptionLogRepository.ParticipantAndConsumptionLog> byChallengeId = consumptionLogFindService.findByChallengeId(target.getId());

        if (CompetitionType.TEAM.equals(target.getCompetitionType())) {
            List<ConsumptionLog> red = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.RED)).map(ConsumptionLogRepository.ParticipantAndConsumptionLog::getConsumptionLog).toList();
            List<ConsumptionLog> blue = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.BLUE)).map(ConsumptionLogRepository.ParticipantAndConsumptionLog::getConsumptionLog).toList();

            int redSum = 0;
            int blueSum = 0;

            for (int i = 0; i < red.size(); i++) {
                ConsumptionLog consumptionLog = red.get(i);
                redSum += consumptionLog.getBalance();
            }

            for (int i = 0; i < blue.size(); i++) {
                ConsumptionLog consumptionLog = blue.get(i);
                blueSum += consumptionLog.getBalance();
            }

            if (redSum > target.getBudgetCap() && blueSum > target.getBudgetCap()) {
                Events.raise(new ChallengeEndedEvent(target.getId(), LocalDateTime.now()));
            }

        } else {

        }

    }
}
