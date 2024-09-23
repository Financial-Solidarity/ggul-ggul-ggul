package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.fcmtoken.infra.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ChallengeParticipantSendMessageService {
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final
    @Transactional
    public
}
