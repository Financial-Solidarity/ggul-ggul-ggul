package com.ggul.application.payment.domain.repository;

import com.ggul.application.payment.ui.dto.ConsumptionChartView;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.ui.dto.ConsumptionLogView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ConsumptionLogRepository extends JpaRepository<ConsumptionLog, UUID> {

    @Query("SELECT new com.ggul.application.payment.ui.dto.ConsumptionLogView(cl.productName, cl.createdAt, cl.balance, pc.name, cl.market, gl.num) " +
            "FROM ConsumptionLog cl " +
                "JOIN GgulLog gl ON cl.ggulLog = gl " +
                "JOIN ProductCategory pc ON cl.productCategory = pc " +
            "WHERE cl.user.id = :userId " +
                "AND cl.createdAt BETWEEN :startedAt AND :endedAt " +
            "ORDER BY cl.createdAt DESC ")
    Slice<ConsumptionLogView> findByUserAndCreatedAtBetween(@Param("userId") UUID userId, @Param("startedAt") LocalDateTime startedAt, @Param("endedAt") LocalDateTime endedAt, Pageable pageable);

    @Query("SELECT new com.ggul.application.payment.ui.dto.ConsumptionChartView(cl.productCategory.name, SUM(cl.balance)) " +
            "FROM ConsumptionLog cl " +
                "JOIN ProductCategory pc ON cl.productCategory = pc " +
            "WHERE cl.user.id = :userId " +
                "AND cl.createdAt BETWEEN :startedAt AND :endedAt " +
            "GROUP BY cl.productCategory.name")
    List<ConsumptionChartView> findByUserAndCreatedAtBetweenGroupByProductCategoryName(@Param("userId") UUID userId, @Param("startedAt") LocalDateTime startedAt, @Param("endedAt") LocalDateTime endedAt);

}
