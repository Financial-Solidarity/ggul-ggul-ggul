package com.ggul.application.challange.domain.repository;

import com.ggul.application.challange.domain.ChallengeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChallengeLogRepository extends JpaRepository<ChallengeLog, UUID> {

    List<ChallengeLog> findAllByChallenge_Id(UUID challengeId);
}
