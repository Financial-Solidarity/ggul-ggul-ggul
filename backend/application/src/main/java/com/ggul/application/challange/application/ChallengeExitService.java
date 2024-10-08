package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeExitRequest;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.challange.exception.ChallengeNotFoundException;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.common.event.Events;
import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeExitService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;


    @Transactional
    public void challengeExit(ChallengeExitRequest request, UUID sessionId) {
        UUID challengeId = request.getChallengeId();
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(ChallengeNotFoundException::new);
        ChallengeParticipant challengeParticipant = challengeParticipantRepository.findByChallenge_IdAndUser_Id(challengeId, sessionId).orElseThrow(ChallengeParticipantNotExistException::new);

        if (challenge.isOwner(challengeParticipant.getUser())) {
            if (challengeParticipantRepository.countByChallenge_Id(challengeId) == 1) {
                challenge.delete();
            } else {
                ChallengeParticipant newOwner = challengeParticipantRepository.findFirstByChallenge_IdOrderByCreatedAt(challengeId);
                challenge.changeOwner(newOwner.getUser());
                Events.raise(new ChallengeParticipantChangedEvent(challengeId, newOwner.getId(), newOwner.getNickname(), newOwner.getProfile(), true, newOwner.getType(), false, false));
            }
        }
        challengeParticipant.delete();
        Events.raise(new ChallengeParticipantChangedEvent(challengeId, challengeParticipant.getId(), challengeParticipant.getNickname(), challengeParticipant.getProfile(), false, challengeParticipant.getType(), false, false));
    }

    @Transactional
    public void challengeExitAll(UUID challengeId) {
        List<ChallengeParticipant> allByChallengeId = challengeParticipantRepository.findAllByChallenge_Id(challengeId);
        allByChallengeId.forEach(SoftDeleteEntity::delete);
    }
}
