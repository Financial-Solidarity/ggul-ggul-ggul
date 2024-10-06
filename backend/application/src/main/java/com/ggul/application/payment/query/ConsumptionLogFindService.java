package com.ggul.application.payment.query;

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

    @Transactional(readOnly = true)
    public Slice<ConsumptionLogView> findAll(UUID userId, Pageable pageable, LocalDate startedAt, LocalDate endedAt) {
        return consumptionLogRepository.findByUserAndCreatedAtBetween(userId, startedAt.atStartOfDay(), endedAt.atStartOfDay().with(LocalTime.MAX), pageable);
    }

    @Transactional(readOnly = true)
    public List<ConsumptionChartView> findChartValue(UUID userId, LocalDate startedAt, LocalDate endedAt) {
        return consumptionLogRepository.findByUserAndCreatedAtBetweenGroupByProductCategoryName(userId, startedAt.atStartOfDay(), endedAt.atStartOfDay().with(LocalTime.MAX));
    }

    @Transactional(readOnly = true)
    public List<ChallengeConsumptionView> findAllByChallengeId(UUID challengeId) {
        List<ConsumptionLogRepository.ParticipantAndConsumptionLog> allByChallengeId = consumptionLogRepository.findAllByChallenge_Id(challengeId);
        return allByChallengeId.stream().map(participantAndConsumptionLog ->
                ChallengeConsumptionView.builder()
                        .consumptionLog(participantAndConsumptionLog.getConsumptionLog())
                        .category(participantAndConsumptionLog.getProductCategory())
                        .walletHistory(participantAndConsumptionLog.getWalletHistory())
                        .challengeParticipant(participantAndConsumptionLog.getParticipant())
                        .build()
        ).toList();
    }
}
