
package com.ggul.application.challange.handler;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.common.infra.websocket.WebsocketSender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
        participants.forEach(participant -> {
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
        if (event.getIsNew()) {
            return "CHALLENGE_JOIN";
        }

        if (event.getIsDeleted()) {
            return "CHALLENGE_EXIT";
        }

        return "CHALLENGE_CHANGE";
    }

    @Getter
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
