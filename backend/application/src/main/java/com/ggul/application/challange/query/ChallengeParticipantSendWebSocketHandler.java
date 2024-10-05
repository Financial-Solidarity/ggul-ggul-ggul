
package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.event.ChallengeDestroyedEvent;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.challange.event.ChallengeReadiedEvent;
import com.ggul.application.challange.event.ChallengeStartedEvent;
import com.ggul.application.common.infra.websocket.WebsocketSender;
import com.ggul.application.notification.application.NotificationSendService;
import com.ggul.application.notification.domain.Notification;
import com.ggul.application.notification.domain.NotificationType;
import com.ggul.application.user.domain.User;
import lombok.*;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ChallengeParticipantSendWebSocketHandler {
    private final WebsocketSender websocketSender;
    private final ChallengeParticipantRepository challengeParticipantRepository;

    @Async
    @EventListener
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public void teamChangedEventHandler(ChallengeParticipantChangedEvent event) {
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());
        String messageType = getWebsocketType(event);
        participants.forEach(participant->{
            Response body = Response.builder()
                    .challengeId(event.getChallengeId())
                    .team(event.getType().getType().name())
                    .isMine(Objects.equals(participant.getId(), event.getParticipantId()))
                    .nickname(event.getNickname())
                    .isOwner(event.getIsOwner())
                    .participantId(event.getParticipantId())
                    .profileUrl(event.getProfile())
                    .build();
            websocketSender.send(participant.getUser().getId(), messageType, body);
        });
    }


    private String getWebsocketType(ChallengeParticipantChangedEvent event) {
        if(event.getIsNew()) {
            return "CHALLENGE_JOIN";
        }

        if(event.getIsDeleted()) {
            return "CHALLENGE_EXIT";
        }

        return "CHALLENGE_CHANGE";
    }

    @Builder
    @AllArgsConstructor
    private static class Response {
        private UUID challengeId;
        private UUID participantId;
        private String nickname;
        private String profileUrl;
        private Boolean isOwner;
        private Boolean isMine;
        private String team;
    }
}
