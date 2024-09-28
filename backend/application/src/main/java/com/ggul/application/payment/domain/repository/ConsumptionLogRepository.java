package com.ggul.application.payment.domain.repository;

import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.ui.dto.ConsumptionLogView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface ConsumptionLogRepository extends JpaRepository<ConsumptionLog, UUID> {

    @Query("SELECT new com.ggul.application.payment.ui.dto.ConsumptionLogView(cl.productName, cl.createdAt, cl.balance, pc.name, cl.market, gl.num) FROM ConsumptionLog cl JOIN GgulLog gl ON cl.ggulLog = gl JOIN ProductCategory pc ON cl.productCategory = pc WHERE cl.user.id = :userId AND cl.createdAt BETWEEN :startedAt AND :endedAt ORDER BY cl.createdAt DESC ")
    Slice<ConsumptionLogView> findByUserAndCreatedAtBetween(@Param("userId") UUID userId, @Param("startedAt") LocalDate startedAt, @Param("endedAt") LocalDate endedAt, Pageable pageable);
}
