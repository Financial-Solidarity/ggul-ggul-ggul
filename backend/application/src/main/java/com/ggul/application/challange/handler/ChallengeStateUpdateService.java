package com.ggul.application.challange.handler;

import com.ggul.application.challange.domain.*;
import com.ggul.application.challange.domain.repository.ChallengeLogRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeDestroyedEvent;
import com.ggul.application.challange.event.ChallengeEndedEvent;
import com.ggul.application.challange.event.ChallengeStartedEvent;
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

@RequiredArgsConstructor
@Slf4j
@Service
public class ChallengeStateUpdateService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeLogRepository challengeLogRepository;
    private final ConsumptionLogFindService consumptionLogFindService;
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
                target.delete();
                Events.raise(new ChallengeDestroyedEvent(id));
            } else {
                Events.raise(new ChallengeStartedEvent(id, target.getEndedAt()));
            }
        }
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void challengeEndUpdate(UUID id) {
        Optional<Challenge> byIsEndedFalse = challengeRepository.findByIsEndedFalse(id);

        if (byIsEndedFalse.isEmpty()) {
            return;
        }

        Challenge target = byIsEndedFalse.get();

        if(target.getIsEnded()) {
            return;
        }

        long minutesTerm = Duration.between(target.getStartedAt(), target.getEndedAt()).toMinutes();

        List<ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet> byChallengeId = consumptionLogFindService.findByChallengeId(target.getId());

        if (CompetitionType.TEAM.equals(target.getCompetitionType())) {
            List<ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet> redTeam = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.RED)).toList();
            List<ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet> blueTeam = byChallengeId.stream().filter(consumptionInfo -> consumptionInfo.getParticipant().getType().equals(ChallengeParticipantType.BLUE)).toList();

            int redSum = 0;
            int blueSum = 0;

            for (ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet participantAndConsumptionLogAndWallet : redTeam) {
                ConsumptionLog consumptionLog = participantAndConsumptionLogAndWallet.getConsumptionLog();
                if (consumptionLog == null) {
                    continue;
                }
                redSum += consumptionLog.getBalance();
            }

            for (ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet participantAndConsumptionLogAndWallet : blueTeam) {
                ConsumptionLog consumptionLog = participantAndConsumptionLogAndWallet.getConsumptionLog();
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
            List<ChallengeLog> redLogs = redTeam.stream().map(member -> member.getParticipant().isWin(isRedWinner, finalRedGgul, isRedOverBudget | isBlueOverBudget)).toList();
            long finalBlueGgul = blueGgul;
            List<ChallengeLog> blueLogs = blueTeam.stream().map(member -> member.getParticipant().isWin(isBlueWinner, finalBlueGgul, isBlueOverBudget | isBlueOverBudget)).toList();
            challengeLogRepository.saveAll(redLogs);
            challengeLogRepository.saveAll(blueLogs);


            target.end();
            Events.raise(new ChallengeEndedEvent(target.getId()));

            sendGgul(redTeam, redGgul);
            sendGgul(blueTeam, blueGgul);

        } else {
            Map<ChallengeParticipant, Integer> prefixs = new HashMap<>();
            byChallengeId.forEach(
                    challengeInfo -> {
                        prefixs.put(challengeInfo.getParticipant(), prefixs.getOrDefault(challengeInfo.getParticipant(), 0) + challengeInfo.getConsumptionLog().getBalance());
                    }
            );

            long successGgul = (long) (minutesTerm * term * personalSuccess);
            long failureGgul = (long) (minutesTerm * term * personalFailure);
            Boolean isSuccess = false;
            List<Long> gguls = new ArrayList<>();
            for(Map.Entry<ChallengeParticipant, Integer> entry : prefixs.entrySet()) {
                ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet userInfo = byChallengeId.stream().filter(info -> Objects.equals(entry.getKey(), info.getParticipant())).findFirst().get();

                long ggul = 0;
                if(entry.getValue() > target.getBudgetCap()) {
                    ggul = successGgul;
                    isSuccess = true;
                }else {
                    ggul = failureGgul;
                }
                gguls.add(ggul);
            }
            List<ChallengeLog> logs = new ArrayList<>();
            for(int i = 0 ; i < gguls.size(); i++) {
                ChallengeParticipant participant = byChallengeId.get(i).getParticipant();
                ChallengeLog win = participant.isWin(isSuccess, gguls.get(i), isSuccess);
                logs.add(win);
            }

            target.end();
            Events.raise(new ChallengeEndedEvent(target.getId()));
            for(int i = 0 ; i < gguls.size(); i++) {
                sendGgul(byChallengeId.get(i).getWallet(), gguls.get(i));
            }

        }

    }

    private void sendGgul(List<ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet> list, Long num) {
        list.forEach(info -> {
            Wallet participantWallet = info.getWallet();
            sendGgul(participantWallet, num);
        });
    }

    private void sendGgul(Wallet wallet, Long ggul) {
        walletService.grantTokens(wallet, ggul);
    }
}
