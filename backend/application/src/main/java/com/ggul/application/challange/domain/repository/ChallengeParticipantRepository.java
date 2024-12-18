package com.ggul.application.challange.domain.repository;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChallengeParticipantRepository extends JpaRepository<ChallengeParticipant, UUID> {
    Boolean existsByChallenge_IdAndUser_Id(UUID challengeId, UUID participantId);
    Integer countByChallenge_IdAndType(UUID challengeId, ChallengeParticipantType type);
    Integer countByChallenge_Id(UUID challengeId);

    Optional<ChallengeParticipant> findByChallenge_IdAndUser_Id(UUID challengeId, UUID userId);

    List<ChallengeParticipant> findAllByChallenge_Id(UUID challengeId);
    List<ChallengeParticipant> findAllByChallenge_IdOrderByCreatedAt(UUID challengeId);

    List<ChallengeParticipant> findChallengeParticipantByChallenge_IdAndType(UUID challengeId, ChallengeParticipantType type);


    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeParticipantView(cp.id, cp.nickname, cp.profile, cp.type) " +
            "FROM ChallengeParticipant cp " +
            "WHERE cp.challenge.id = :challengeId")
    List<ChallengeParticipantView> findChallengeParticipantViewByChallenge_Id(@Param("challengeId") UUID challengeId);


    @Query("SELECT new com.ggul.application.challange.ui.dto.ChallengeParticipantView(cp.id, cp.nickname, cp.profile, cp.type) " +
            "FROM ChallengeParticipant cp " +
            "WHERE cp.challenge.id = :challengeId AND cp.type = :type")
    List<ChallengeParticipantView> findChallengeParticipantViewByChallenge_IdAndType(@Param("challengeId") UUID challengeId, @Param("type") ChallengeParticipantType type);

}
