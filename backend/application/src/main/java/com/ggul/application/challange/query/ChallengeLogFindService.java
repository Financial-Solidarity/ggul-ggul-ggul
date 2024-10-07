package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.ChallengeLog;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.repository.ChallengeLogRepository;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.exception.ChallengeIsNotEndException;
import com.ggul.application.challange.exception.ChallengeParticipantNotExistException;
import com.ggul.application.challange.ui.dto.ChallengeLogView;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeLogFindService {
    private final ChallengeLogRepository challengeLogRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    @Transactional(readOnly = true)
    public List<ChallengeLogView> findAll(UUID challengeId, UUID userId) {

        ChallengeParticipant me = challengeParticipantRepository.findByChallenge_IdAndUser_Id(challengeId, userId).orElseThrow(ChallengeParticipantNotExistException::new);
        if(!me.getChallenge().getIsEnded()) {
            throw new ChallengeIsNotEndException();
        }
        List<ChallengeLog> allByChallengeId = challengeLogRepository.findAllByChallenge_Id(challengeId);

        return allByChallengeId.stream().map(log -> {
            ChallengeParticipantView profile = new ChallengeParticipantView(log.getParticipant());
            profile.setIsMine(me.getId());
            return ChallengeLogView.builder().profile(profile).ggulNum(log.getGgulNum()).isLose(log.getIsLose()).isSuccess(log.getIsSuccess()).build();
        }).toList();
    }
}
