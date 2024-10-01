package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.common.infra.websocket.WebsocketSender;
import com.ggul.application.payment.ui.dto.ConsumptionView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingSendService {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final WebsocketSender websocketSender;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;

    @Async
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public void sendChat(Chatting chatting) {
        List<ChallengeParticipant> participants = chattingRoomParticipantRepository.findAllChallengeParticipantByChattingRoomId(chatting.getChattingRoom().getId());

        participants.forEach(participant -> {
            ChallengeParticipantView participantView = new ChallengeParticipantView(chatting.getParticipant());
            participantView.setIsMine(participant.getId());
            Request request = RequestBuilder.create(chatting, participantView, chatting.getChattingRoom().getId(), participant.getChallenge().getId());

            websocketSender.send(participant.getUser().getId(), chatting.getType().name(), request);
        });
    }

    private static class RequestBuilder {
        static Request create(Chatting chatting, ChallengeParticipantView participant, UUID chattingRoomId, UUID challengeId) {
            if (Chatting.Type.COMMON.equals(chatting.getType())) {
                return CommonChatRequest.builder()
                        .challengeId(challengeId)
                        .chattingRoomId(chattingRoomId)
                        .chattingId(chatting.getId())
                        .content(chatting.getContent())
                        .profile(participant)
                        .sentAt(DATE_TIME_FORMATTER.format(chatting.getCreatedAt()))
                        .build();
            }

            if (Chatting.Type.JUSTIFICATION.equals(chatting.getType())) {
                return JustificationChatRequest.builder()
                        .content(chatting.getContent())
                        .chattingId(chatting.getId())
                        .challengeId(challengeId)
                        .chattingRoomId(chattingRoomId)
                        .profile(participant)
                        .consumption(new ConsumptionView(chatting.getCategoryName(), chatting.getBalance()))
                        .sentAt(DATE_TIME_FORMATTER.format(chatting.getCreatedAt()))
                        .build();
            }

            if (Chatting.Type.SPEND.equals(chatting.getType())) {
                return SpendChatRequest.builder()
                        .chattingId(chatting.getId())
                        .challengeId(challengeId)
                        .chattingRoomId(chattingRoomId)
                        .profile(participant)
                        .consumption(new ConsumptionView(chatting.getCategoryName(), chatting.getBalance()))
                        .sentAt(DATE_TIME_FORMATTER.format(chatting.getCreatedAt()))
                        .build();
            }

            throw new IllegalArgumentException("Unsupported chatting type: " + chatting.getType());
        }
    }

    @Getter
    @SuperBuilder
    @AllArgsConstructor
    @NoArgsConstructor
    private abstract static class Request {
        private UUID chattingRoomId;
        private UUID challengeId;
        private UUID chattingId;
        private String sentAt;
        private ChallengeParticipantView profile;
    }

    @Getter
    @SuperBuilder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class CommonChatRequest extends Request {
        private String content;
    }

    @Getter
    @SuperBuilder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class SpendChatRequest extends Request {
        private ConsumptionView consumption;
    }

    @Getter
    @SuperBuilder
    @AllArgsConstructor
    @NoArgsConstructor
    private static class JustificationChatRequest extends Request {
        private String content;
        private ConsumptionView consumption;
    }
}
