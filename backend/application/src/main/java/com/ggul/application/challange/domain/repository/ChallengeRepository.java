package com.ggul.application.challange.domain.repository;



import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.ui.dto.ChallengeView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeView(c.id, c.title, c.passwordExist, c.competitionType, c.isBlindness, c.limitParticipant, COUNT(cp.id), c.budgetCap, c.startedAt, c.endedAt, c.owner.id, :sessionId) " +
            "FROM Challenge c " +
            "LEFT JOIN ChallengeParticipant cp ON cp.challenge = c " +
            "WHERE c.isReady = false AND c.isEnded = false AND c.title like %:title% AND c.startedAt > NOW() GROUP BY c, :sessionId ORDER BY c.startedAt DESC, c.createdAt DESC ")
    Slice<ChallengeView> findChallengeViewByTitle(Pageable pageable, @Param("title") String title, @Param("sessionId") UUID sessionId);

    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeView(c.id, c.title, c.passwordExist, c.competitionType, c.isBlindness, c.limitParticipant, COUNT(cp.id), c.budgetCap, c.startedAt, c.endedAt, c.owner.id, :sessionId) " +
            "FROM Challenge c " +
            "LEFT JOIN ChallengeParticipant cp ON cp.challenge = c " +
            "WHERE c.isReady = false AND c.isEnded = false AND c.startedAt > NOW() GROUP BY c, :sessionId ORDER BY c.startedAt DESC, c.createdAt DESC")
    Slice<ChallengeView> findChallengeView(Pageable pageable, @Param("sessionId") UUID sessionId);

    List<Challenge> findAllByIsReadyAndIsDeleted(Boolean isReady, Boolean isDeleted);

    @Query("SELECT c FROM ChallengeParticipant cp JOIN Challenge c ON cp.challenge = c WHERE cp.user.id = :sessionId ")
    List<Challenge> findAllByUserId(@Param("sessionId")UUID sessionId);

    @Query("SELECT c FROM ChallengeParticipant cp JOIN Challenge c ON cp.challenge = c WHERE c.isReady = true AND c.isEnded = false AND cp.user.id = :userId AND c.startedAt <= :now")
    Optional<Challenge> findByIsReadyTrueAndIsEndedFalse(@Param("userId") UUID userId, LocalDateTime now);

    @Query("SELECT c FROM Challenge c JOIN ChallengeParticipant cp ON cp.challenge = c WHERE cp.user.id = :userId AND c.isEnded = false")
    Optional<Challenge> findByIsEndedFalse(@Param("userId")UUID user);
}
