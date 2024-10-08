package com.ggul.application.challange.handler;

import com.ggul.application.challange.application.ChallengeExitService;
import com.ggul.application.challange.domain.*;
import com.ggul.application.challange.domain.repository.ChallengeLogRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeDestroyedEvent;
import com.ggul.application.challange.event.ChallengeEndedEvent;
import com.ggul.application.challange.event.ChallengeStartedEvent;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.common.event.Events;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.query.ConsumptionLogFindService;
import com.ggul.application.wallet.application.WalletService;
import com.ggul.application.wallet.domain.Wallet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChallengeStateUpdateService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeLogRepository challengeLogRepository;
    private final ConsumptionLogFindService consumptionLogFindService;
    private final ChallengeExitService challengeExitService;
    private final WalletService walletService;

    @Value("${challenge.reward.term}")
    private Integer term;

    @Value("${challenge.team.success.winner}")
    private Double teamWinnerMultiple;

    @Value("${challenge.team.success.looser}")
    private Double teamLooserMultiple;

    @Value("${challenge.team.failure.default}")
    private Double teamFailure;

    @Value("${challenge.personal.success}")
    private Double personalSuccess;

    @Value("${challenge.personal.failure}")
    private Double personalFailure;


    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void challengeStateUpdateToStartOrDestroyed(UUID id) {
        Optional<Challenge> byId = challengeRepository.findById(id);
        if (byId.isPresent()) {
            //시작 준비가 안된 경우 => isReady
            Challenge target = byId.get();
            if (!target.getIsReady()) {
                challengeExitService.challengeExitAll(id);
                target.delete();
                log.info("챌린지가 삭제되었습니다. : {} ", target.getId());
                Events.raise(new ChallengeDestroyedEvent(id));
            } else {
                Events.raise(new ChallengeStartedEvent(id, target.getEndedAt()));
            }
        }
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void challengeEndUpdate(UUID id) {
        Optional<Challenge> byIsEndedFalse = challengeRepository.findById(id);

        if (byIsEndedFalse.isEmpty()) {
            return;
        }

        Challenge target = byIsEndedFalse.get();

        if (target.getIsEnded()) {
            return;
        }

        long minutesTerm = Duration.between(target.getStartedAt(), target.getEndedAt()).toMinutes();

        List<ConsumptionLogRepository.ParticipantAndConsumptionLogs> byChallengeId = consumptionLogFindService.findByChallengeId(target.getId());
        for(ConsumptionLogRepository.ParticipantAndConsumptionLogs logs : byChallengeId) {
            log.info("challenge participant : {}",new ChallengeParticipantView(logs.getParticipant()));
        }
        if (CompetitionType.TEAM.equals(target.getCompetitionType())) {
            List<ConsumptionLogRepository.ParticipantAndConsumptionLogs> redTeam = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.RED)).toList();
            List<ConsumptionLogRepository.ParticipantAndConsumptionLogs> blueTeam = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.BLUE)).toList();

            int redSum = 0;
            int blueSum = 0;

            for (ConsumptionLogRepository.ParticipantAndConsumptionLogs participantAndConsumptionLogs : redTeam) {
                ConsumptionLog consumptionLog = participantAndConsumptionLogs.getConsumptionLog();
                if (consumptionLog == null) {
                    continue;
                }
                redSum += consumptionLog.getBalance();
            }

            for (ConsumptionLogRepository.ParticipantAndConsumptionLogs participantAndConsumptionLogs : blueTeam) {
                ConsumptionLog consumptionLog = participantAndConsumptionLogs.getConsumptionLog();
                if (consumptionLog == null) {
                    continue;
                }
                blueSum += consumptionLog.getBalance();
            }
            long redGgul = minutesTerm * term;
            long blueGgul = minutesTerm * term;

            boolean isRedWinner = redSum < blueSum;
            boolean isBlueWinner = blueSum < redSum;
            boolean isRedOverBudget = redSum > target.getBudgetCap();
            boolean isBlueOverBudget = blueSum > target.getBudgetCap();

            if (isRedWinner) {
                // Red wins
                if (isRedOverBudget) {
                    redGgul *= teamFailure;
                    blueGgul *= teamFailure;
                } else {
                    redGgul *= teamWinnerMultiple;
                    blueGgul *= isBlueOverBudget ? teamFailure : teamLooserMultiple;
                }
            } else if (isBlueWinner) {
                // Blue wins
                if (isBlueOverBudget) {
                    blueGgul *= teamFailure;
                    redGgul *= teamFailure;
                } else {
                    blueGgul *= teamWinnerMultiple;
                    redGgul *= isRedOverBudget ? teamFailure : teamLooserMultiple;
                }
            } else {
                // Tie case
                if (isRedOverBudget) {
                    redGgul *= teamFailure;
                    blueGgul *= teamFailure;
                }
            }

            long finalRedGgul = redGgul;
            Set<ChallengeLog> redLogs = redTeam.stream().map(member -> member.getParticipant().isWin(isRedWinner, finalRedGgul, isRedOverBudget || isBlueOverBudget)).collect(Collectors.toSet());
            long finalBlueGgul = blueGgul;
            Set<ChallengeLog> blueLogs = blueTeam.stream().map(member -> member.getParticipant().isWin(isBlueWinner, finalBlueGgul, isRedOverBudget || isBlueOverBudget)).collect(Collectors.toSet());
            challengeLogRepository.saveAll(redLogs);
            challengeLogRepository.saveAll(blueLogs);


            target.end();
            Events.raise(new ChallengeEndedEvent(target.getId()));

            sendGgul(redLogs);
            sendGgul(blueLogs);

        } else {
            Map<ChallengeParticipant, Integer> prefixs = new HashMap<>();
            byChallengeId.forEach(
                    challengeInfo -> {
                        prefixs.put(challengeInfo.getParticipant(), prefixs.getOrDefault(challengeInfo.getParticipant(), 0) + challengeInfo.getConsumptionLog().getBalance());
                    }
            );

            Boolean isSuccess = false;
            for(Map.Entry<ChallengeParticipant, Integer> entry : prefixs.entrySet()) {
                if(entry.getValue() < target.getBudgetCap()) {
                    isSuccess = true;
                    break;
                }
            }


            long successGgul = (long) (minutesTerm * term * personalSuccess);
            long failureGgul = (long) (minutesTerm * term * personalFailure);


            List<ChallengeLog> logs = new ArrayList<>();
            for (Map.Entry<ChallengeParticipant, Integer> entry : prefixs.entrySet()) {
                long ggul = entry.getValue() <= target.getBudgetCap() ? successGgul : failureGgul;
                ChallengeLog log = entry.getKey().isWin(true, ggul, isSuccess);
                logs.add(log);
            }

            challengeLogRepository.saveAll(logs);
            target.end();
            Events.raise(new ChallengeEndedEvent(target.getId()));
            sendGgul(logs);

        }

    }

    private void sendGgul(Collection<ChallengeLog> logs) {
        for(ChallengeLog clog : logs) {
            log.info("challenge log info : {}", clog);
            walletService.grantTokens(clog.getParticipant().getUser().getId(), clog.getGgulNum().longValue());
        }
    }

    private void sendGgul(Wallet wallet, Long ggul) {
        walletService.grantTokens(wallet, ggul);
    }
}
