package com.ggul.application.payment.domain.repository;

import com.ggul.application.payment.domain.ConsumptionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConsumptionLogRepository extends JpaRepository<ConsumptionLog, UUID> {
}
