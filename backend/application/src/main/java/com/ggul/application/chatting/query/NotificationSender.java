package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.fcmtoken.infra.FirebaseCloudMessageService;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationSender {
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;

    @Async
    @Transactional(readOnly = true, propagation = Propagation.REQUIRES_NEW)
    public void sendNotification(Chatting chatting) {
        //뭐가 됬든 챌린지마다 한번씩만 터트리면 됨.
        String content = Chatting.Type.SPEND.equals(chatting.getType()) ? chatting.getBalance() + "원 결제" : chatting.getContent();
        String type = "CHAT_"+chatting.getType().name();
        List<ChallengeParticipant> participants = chattingRoomParticipantRepository.findAllChallengeParticipantByChattingRoomId(chatting.getChattingRoom().getId());
        participants.forEach(participant -> {
            MulticastMessage multicastMessage = FirebaseCloudMessageService.generateMulticastMessage(participant.getUser().getFcmTokens(), chatting.getParticipant().getNickname(), content,
                    type, null);
            try {
                firebaseCloudMessageService.sendDataMessageTo(multicastMessage);
            } catch (FirebaseMessagingException ignored) {

            }
        });
    }
}
