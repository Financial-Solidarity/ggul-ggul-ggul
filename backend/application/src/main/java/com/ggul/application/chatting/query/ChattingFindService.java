package com.ggul.application.chatting.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import com.ggul.application.chatting.domain.repository.ChattingRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.chatting.exception.ChattingRoomParticipantNotExistException;
import com.ggul.application.chatting.ui.dto.ChattingView;
import com.ggul.application.payment.ui.dto.ConsumptionView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingFindService {
    private final ChattingRepository chattingRepository;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;


    @Transactional(readOnly = true)
    public List<ChattingView> findAllByBefore(UUID userId, UUID chattingRoomId) {
        ChattingRoomParticipant me = chattingRoomParticipantRepository.findByChattingRoom_IdAndChallengeParticipant_User_Id(chattingRoomId, userId).orElseThrow(ChattingRoomParticipantNotExistException::new);
        ChallengeParticipant meChallengeInfo = me.getChallengeParticipant();
        List<Chatting> chattings = chattingRepository.findAllByChattingRoom_IdAndCreatedAtBeforeOrderByCreatedAt(chattingRoomId, me.getLastConnectedAt());

        return chattings.stream().map(chatting -> {
            ChallengeParticipantView participantView = new ChallengeParticipantView(chatting.getParticipant());
            participantView.setIsMine(meChallengeInfo.getId());
            return ChattingView.builder().chattingId(chatting.getId()).type(chatting.getType().name()).content(chatting.getContent()).consumption(generateConsumption(chatting)).profile(participantView).sentAt(chatting.getCreatedAt()).build();

        }).toList();
    }

    private ConsumptionView generateConsumption(Chatting chatting) {
        return Chatting.Type.COMMON.equals(chatting.getType()) ? null : ConsumptionView.builder().balance(chatting.getBalance()).category(chatting.getCategoryName()).build();
    }
}
