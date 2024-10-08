
package com.ggul.application.challange.handler;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.challange.event.ChallengeReadiedEvent;
import com.ggul.application.challange.exception.ChallengeNotFoundException;
import com.ggul.application.common.infra.websocket.WebsocketSender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeParticipantSendWebSocketHandler {
    private final WebsocketSender websocketSender;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final ChallengeRepository challengeRepository;

    @Async
    @TransactionalEventListener
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public void teamChangedEventHandler(ChallengeParticipantChangedEvent event) {
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());
        String messageType = getWebsocketType(event);
        participants.forEach(participant -> {
            ResponseForParticipantChange body = ResponseForParticipantChange.builder()
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

    @Async
    @TransactionalEventListener
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public void challengeReadiedEventHandler(ChallengeReadiedEvent event) {
        Challenge challenge = challengeRepository.findById(event.getChallengeId()).orElseThrow(ChallengeNotFoundException::new);
        List<ChallengeParticipant> allByChallengeId = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());

        String messageType = "CHALLENGE_READY";
        if (CompetitionType.TEAM.equals(challenge.getCompetitionType())) {
            allByChallengeId.forEach(participant -> {
                ResponseForChallengeReady body = ResponseForChallengeReady.builder()
                        .challengeId(event.getChallengeId())
                        .myTeamChattingRoomId(participant.getType().equals(ChallengeParticipantType.BLUE) ? event.getBlueTeamChattingRoomId() : event.getRedTeamChattingRoomId())
                        .totalChattingRoomId(event.getTotalChattingRoomId())
                        .build();
                websocketSender.send(participant.getUser().getId(), messageType, body);
            });
        } else {
            allByChallengeId.forEach(participant -> {
                ResponseForChallengeReady body = ResponseForChallengeReady.builder()
                        .challengeId(event.getChallengeId())
                        .totalChattingRoomId(event.getTotalChattingRoomId())
                        .build();
                websocketSender.send(participant.getUser().getId(), messageType, body);
            });
        }
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
    private static class ResponseForParticipantChange {
        private UUID challengeId;
        private UUID participantId;
        private String nickname;
        private String profileUrl;
        private Boolean isOwner;
        private Boolean isMine;
        private String team;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    private static class ResponseForChallengeReady {
        private UUID challengeId;
        private UUID myTeamChattingRoomId;
        private UUID totalChattingRoomId;
    }
}
