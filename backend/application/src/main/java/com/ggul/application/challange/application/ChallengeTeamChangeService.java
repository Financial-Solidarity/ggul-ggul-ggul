package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeTeamChangeRequest;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.challange.exception.ChallengeIsReadyException;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.common.event.Events;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeTeamChangeService {
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Transactional
    public ChallengeParticipantView changeTeam(ChallengeTeamChangeRequest request, UUID userId) {
        ChallengeParticipant findById = challengeParticipantRepository.findById(request.getParticipantId()).orElseThrow(ChallengeParticipantNotExistException::new);
        if(!Objects.requireNonNull(findById.getUser().getId()).equals(userId)) {
            throw new ChallengeParticipantNotExistException();
        }

        if(findById.getChallenge().getIsReady()) {
            throw new ChallengeIsReadyException();
        }

        findById.teamChangeToggle();

        Events.raise(new ChallengeParticipantChangedEvent(findById.getChallenge().getId(), findById.getId(), findById.getNickname(), findById.getProfile(), Objects.equals(findById.getUser().getId(), findById.getChallenge().getOwner().getId()), findById.getType(), false, false));
        return new ChallengeParticipantView(findById.getId(), findById.getNickname(), findById.getProfile(), findById.getType(), true);
    }
}
