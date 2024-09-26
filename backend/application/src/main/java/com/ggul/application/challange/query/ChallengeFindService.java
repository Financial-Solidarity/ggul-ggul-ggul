package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.exception.ChallengeNotFoundException;
import com.ggul.application.challange.ui.dto.ChallengeView;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeFindService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Transactional(readOnly = true)
    public ChallengeView getChallenge(UUID id, UUID userId) {
        //TODO : 챌린지 참가자인 경우 판단하는 로직 필요.
        Challenge challenge = challengeRepository.findById(id).orElseThrow(ChallengeNotFoundException::new);
        Integer count = challengeParticipantRepository.countByChallenge_Id(challenge.getId());

        return ChallengeView.from(challenge, count, Objects.equals(challenge.getOwner().getId(), userId));
    }

    @Transactional(readOnly = true)
    public Slice<ChallengeView> getChallenges(String title, UUID sessionId,Pageable pageable) {
        if(title == null || title.isEmpty()) {
            return challengeRepository.findChallengeView(pageable, sessionId);
        }
        return challengeRepository.findChallengeViewByTitle(pageable, title, sessionId);
    }
}
