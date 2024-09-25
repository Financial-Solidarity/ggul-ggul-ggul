package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeParticipantFindService {
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Transactional(readOnly = true)
    public ChallengeParticipantType allocateParticipantType(UUID challengeId) {
        if(challengeParticipantRepository.countByChallenge_IdAndType(challengeId, ChallengeParticipantType.RED ) <= challengeParticipantRepository.countByChallenge_IdAndType(challengeId, ChallengeParticipantType.BLUE)) {
            return ChallengeParticipantType.RED;
        }else {
            return ChallengeParticipantType.BLUE;
        }
    }

    @Transactional(readOnly = true)
    public List<ChallengeParticipantView> findAllByChallengeId(UUID challengeId, UUID userId) {
        if(!challengeParticipantRepository.existsByChallenge_IdAndUser_Id(challengeId, userId)) {
            throw new ChallengeParticipantNotExistException();
        }
        return challengeParticipantRepository.findChallengeParticipantViewByChallenge_Id(challengeId);
    }

    @Transactional(readOnly = true)
    public List<ChallengeParticipantView> findAllByChallengeId(UUID challengeId, ChallengeParticipantType type) {
        return challengeParticipantRepository.findChallengeParticipantViewByChallenge_IdAndType(challengeId, type);
    }


}
