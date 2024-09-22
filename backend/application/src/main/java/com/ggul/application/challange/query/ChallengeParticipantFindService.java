package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
