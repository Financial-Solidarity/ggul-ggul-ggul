package com.ggul.application.challange.domain.repository;



import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.ui.dto.ChallengeView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeView(c.id, c.title, c.passwordExist, c.competitionType, c.isBlindness, c.limitParticipant, c.budgetCap, c.startedAt, c.endedAt) " +
            "FROM Challenge c " +
            "WHERE c.isReady = false AND c.isEnded = false AND c.title like %:title% ORDER BY c.startedAt DESC, c.createdAt DESC")
    Slice<ChallengeView> findChallengeViewByTitle(Pageable pageable, @Param("title") String title);

    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeView(c.id, c.title, c.passwordExist, c.competitionType, c.isBlindness, c.limitParticipant, c.budgetCap, c.startedAt, c.endedAt) " +
            "FROM Challenge c " +
            "WHERE c.isReady = false AND c.isEnded = false ORDER BY c.startedAt DESC, c.createdAt DESC")
    Slice<ChallengeView> findChallengeView(Pageable pageable);

    List<Challenge> findAllByIsReadyAndIsDeleted(Boolean isReady, Boolean isDeleted);
}
