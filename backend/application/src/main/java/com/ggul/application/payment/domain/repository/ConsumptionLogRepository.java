package com.ggul.application.payment.domain.repository;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.payment.domain.ProductCategory;
import com.ggul.application.payment.ui.dto.ConsumptionChartView;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.ui.dto.ConsumptionLogView;
import com.ggul.application.wallet.domain.WalletHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ConsumptionLogRepository extends JpaRepository<ConsumptionLog, UUID> {

    @Query("SELECT new com.ggul.application.payment.ui.dto.ConsumptionLogView(cl.productName, cl.createdAt, cl.balance, pc.name, cl.market, wh.quantity) " +
            "FROM ConsumptionLog cl " +
                "JOIN ProductCategory pc ON cl.productCategory = pc " +
                "LEFT JOIN WalletHistory wh ON cl.walletHistory = wh " +
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

    interface ParticipantAndConsumptionLogFetchAll {
        ChallengeParticipant getParticipant();
        ConsumptionLog getConsumptionLog();
        ProductCategory getProductCategory();
        WalletHistory getWalletHistory();
    }

    @Query("SELECT cp as participant, cl as consumptionLog, pc as productCategory, wh as walletHistory " +
            "FROM ConsumptionLog cl " +
                "JOIN User u ON cl.user = u " +
                "JOIN ChallengeParticipant cp ON cp.user = u AND cp.isDeleted = false " +
                "JOIN ProductCategory pc ON cl.productCategory = pc " +
                "LEFT JOIN WalletHistory wh ON cl.walletHistory = wh " +
            "WHERE cp.challenge.id = :challengeId " +
                "AND cl.createdAt BETWEEN cp.challenge.startedAt AND cp.challenge.endedAt " +
            "ORDER BY cl.createdAt DESC")
    List<ParticipantAndConsumptionLogFetchAll> findAllByChallenge_IdFetchAll(@Param("challengeId")UUID challengeId);

    interface ParticipantAndConsumptionLogs {
        ChallengeParticipant getParticipant();
        ConsumptionLog getConsumptionLog();
    }

    @Query("SELECT cl as consumptionLog, cp as participant " +
            "FROM ChallengeParticipant cp " +
                "JOIN Challenge c ON cp.challenge = c " +
                "JOIN User u ON cp.user = u " +
                "LEFT JOIN ConsumptionLog cl ON cl.user = u " +
            "WHERE c.id = :challengeId " +
            "AND (cl.createdAt is null OR  cl.createdAt BETWEEN c.startedAt AND c.endedAt )" )
    List<ParticipantAndConsumptionLogs> findAllByChallenge_Id(UUID challengeId);
}
