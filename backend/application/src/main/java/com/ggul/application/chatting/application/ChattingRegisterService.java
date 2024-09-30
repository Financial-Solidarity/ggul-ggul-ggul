package com.ggul.application.chatting.application;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.chatting.application.dto.ChatRequest;
import com.ggul.application.chatting.application.dto.JustificationChattingRequest;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.repository.ChattingRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.chatting.exception.ChattingJustificationUnAuthorizedException;
import com.ggul.application.chatting.exception.ChattingNotFoundException;
import com.ggul.application.chatting.exception.ChattingRoomParticipantExistException;
import com.ggul.application.chatting.query.ChattingSendService;
import com.ggul.application.chatting.query.NotificationSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRegisterService {
    private final ChattingRepository chattingRepository;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;
    private final ChattingSendService chattingSendService;
    private final NotificationSender notificationSender;

    @Transactional
    public void justificationChattingCreate(JustificationChattingRequest request, UUID userId) {
        Chatting chatting = chattingRepository.findById(request.getChattingId()).orElseThrow(ChattingNotFoundException::new);

        if (!chatting.getParticipant().getUser().getId().equals(userId)) {
            throw new ChattingJustificationUnAuthorizedException();
        }

        Chatting generate = Chatting.builder()
                .participant(chatting.getParticipant())
                .type(Chatting.Type.JUSTIFICATION)
                .categoryName(chatting.getCategoryName())
                .balance(chatting.getBalance())
                .content(request.getContent())
                .build();

        generate = chattingRepository.save(generate);
        chattingSendService.sendChat(generate);
        notificationSender.sendNotification(generate);
    }

    @Transactional
    public void chattingCreate(ChatRequest request, UUID userId) {
        ChallengeParticipant participant = chattingRoomParticipantRepository.findByChattingRoomIdAndUserId(request.getChattingRoomId(), userId).orElseThrow(ChattingRoomParticipantExistException::new);
        Chatting chatting = Chatting.builder()
                .participant(participant)
                .type(Chatting.Type.COMMON)
                .content(request.getContent())
                .build();
        chatting = chattingRepository.save(chatting);
        chattingSendService.sendChat(chatting);
        notificationSender.sendNotification(chatting);
    }
}
