package com.ggul.application.chatting.handler;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.repository.ChattingRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.query.ChattingRoomFindService;
import com.ggul.application.chatting.query.ChattingSendService;
import com.ggul.application.chatting.query.NotificationSender;
import com.ggul.application.chatting.ui.dto.ChattingRoomFindView;
import com.ggul.application.payment.event.PaymentCompletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SpendChattingSendEventListener {
    private final ChattingRepository chattingRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChallengeRepository challengeRepository;
    private final ChattingRoomFindService chattingRoomFindService;
    private final ChattingSendService chattingSendService;
    private final NotificationSender notificationSender;

    @Async
    @EventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendChattingByPaymentEvent(PaymentCompletedEvent event) {
        Optional<Challenge> firstByIsReadyTrueAndIsEndedFalse = challengeRepository.findFirstByIsReadyTrueAndIsEndedFalse();
        if (firstByIsReadyTrueAndIsEndedFalse.isEmpty()) {
            return;
        }

        Challenge target = firstByIsReadyTrueAndIsEndedFalse.get();
        ChattingRoomFindView chattingRoom = chattingRoomFindService.getChattingRoom(target.getId(), event.getUserId());

        ChattingRoom total = chattingRoomRepository.getReferenceById(chattingRoom.getTotalChattingRoomId());
        ChallengeParticipant challengeParticipant = challengeParticipantRepository.findByChallenge_IdAndUser_Id(target.getId(), event.getUserId()).orElseThrow();

        Chatting totalChatting = Chatting.builder()
                .chattingRoom(total)
                .type(Chatting.Type.SPEND)
                .balance(event.getSpendMoney())
                .categoryName(event.getCategoryName())
                .participant(challengeParticipant)
                .build();

        totalChatting = chattingRepository.save(totalChatting);

        Chatting myTeamChatting = null;
        if (CompetitionType.TEAM.equals(target.getCompetitionType())) {
            ChattingRoom myTeam = chattingRoomRepository.getReferenceById(chattingRoom.getMyTeamChattingRoomId());
            myTeamChatting = Chatting.builder()
                    .chattingRoom(myTeam)
                    .type(Chatting.Type.SPEND)
                    .balance(event.getSpendMoney())
                    .categoryName(event.getCategoryName())
                    .participant(challengeParticipant)
                    .build();

            chattingRepository.save(myTeamChatting);

        }

        chattingSendService.sendChat(totalChatting);
        notificationSender.sendNotification(totalChatting);
        if (myTeamChatting != null) {
            chattingSendService.sendChat(myTeamChatting);
        }
        //일단 모든 사용자에게 채팅을 보내고, Fcm Token은 isForeground가 off인 유저들에게만 보내줘.

        // 온라인 => websocket 구독 하고 있음.
        // Fcm Token ->> 세션이 로그인했을 때 줌 With FcmToken ==> Websocket 이 끊겼을 때? 해당 기계는 백그라운드 상태. 기계는 어떻게 감지할 건지? => 그때 해당 사용자의 FCM 토큰으로 전송.

    }
}
