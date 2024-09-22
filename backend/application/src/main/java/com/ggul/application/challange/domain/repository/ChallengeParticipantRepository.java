package com.ggul.application.challange.domain.repository;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChallengeParticipantRepository extends JpaRepository<ChallengeParticipant, UUID> {
    Boolean existsByChallenge_IdAndUser_Id(UUID challengeId, UUID participantId);
    Integer countByChallenge_IdAndType(UUID challengeId, ChallengeParticipantType type);
}
