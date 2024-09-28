package com.ggul.application.payment.query;

import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.ui.dto.ConsumptionLogView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ConsumptionLogFindService {
    private final ConsumptionLogRepository consumptionLogRepository;

    @Transactional(readOnly = true)
    public Slice<ConsumptionLogView> findAll(UUID userId, Pageable pageable, LocalDate startedAt, LocalDate endedAt) {
        return consumptionLogRepository.findByUserAndCreatedAtBetween(userId, startedAt, endedAt, pageable);
    }
}
