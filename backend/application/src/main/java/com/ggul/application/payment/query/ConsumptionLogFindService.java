package com.ggul.application.payment.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.ui.dto.ChallengeConsumptionView;
import com.ggul.application.payment.ui.dto.ConsumptionChartView;
import com.ggul.application.payment.ui.dto.ConsumptionLogView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ConsumptionLogFindService {
    private final ConsumptionLogRepository consumptionLogRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Transactional(readOnly = true)
    public Slice<ConsumptionLogView> findAll(UUID userId, Pageable pageable, LocalDate startedAt, LocalDate endedAt) {
        return consumptionLogRepository.findByUserAndCreatedAtBetween(userId, startedAt.atStartOfDay(), endedAt.atStartOfDay().with(LocalTime.MAX), pageable);
    }

    @Transactional(readOnly = true)
    public List<ConsumptionChartView> findChartValue(UUID userId, LocalDate startedAt, LocalDate endedAt) {
        return consumptionLogRepository.findByUserAndCreatedAtBetweenGroupByProductCategoryName(userId, startedAt.atStartOfDay(), endedAt.atStartOfDay().with(LocalTime.MAX));
    }

    @Transactional(readOnly = true)
    public List<ChallengeConsumptionView> findAllByChallengeId(UUID challengeId, UUID userId) {
        List<ConsumptionLogRepository.ParticipantAndConsumptionLog> allByChallengeId = consumptionLogRepository.findAllByChallenge_IdFetchAll(challengeId);
        ChallengeParticipant me = challengeParticipantRepository.findByChallenge_IdAndUser_Id(challengeId, userId).orElseThrow(ChallengeParticipantNotExistException::new);
        List<ChallengeConsumptionView> list = allByChallengeId.stream().map(participantAndConsumptionLog ->
                ChallengeConsumptionView.builder()
                        .consumptionLog(participantAndConsumptionLog.getConsumptionLog())
                        .category(participantAndConsumptionLog.getProductCategory())
                        .walletHistory(participantAndConsumptionLog.getWalletHistory())
                        .challengeParticipant(participantAndConsumptionLog.getParticipant())
                        .build()
        ).toList();

        list.forEach(view -> view.setIsMine(me.getId()));
        return list;
    }

    @Transactional(readOnly = true)
    public List<ConsumptionLogRepository.ParticipantAndConsumptionLogAndWallet> findByChallengeId(UUID challengeId) {
        return  consumptionLogRepository.findAllByChallenge_Id(challengeId);
    }
}
