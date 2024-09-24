package com.ggul.application.challange.query;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.event.ChallengeDestroyedEvent;
import com.ggul.application.challange.event.ChallengeReadiedEvent;
import com.ggul.application.challange.event.ChallengeStartedEvent;
import com.ggul.application.notification.application.NotificationBulkSendService;
import com.ggul.application.notification.domain.Notification;
import com.ggul.application.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ChallengeParticipantSendMessageHandler {
    private final NotificationBulkSendService notificationBulkSendService;
    private final ChallengeParticipantRepository challengeParticipantRepository;


    @Async
    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendNotification(ChallengeStartedEvent event) {
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());
        Map<String, String> notificationBody = new HashMap<>();
        setChallengeId(notificationBody, event.getChallengeId());

        List<Notification> notifications = participants.stream().map(participant -> notificationBuilder(participant.getUser(), NotificationDataSet.CHALLENGE_START, notificationBody)).toList();
        notificationBulkSendService.sendAll(notifications);
    }

    @Async
    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendNotification(ChallengeDestroyedEvent event) {
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());
        Map<String, String> notificationBody = new HashMap<>();
        setChallengeId(notificationBody, event.getChallengeId());

        List<Notification> notifications = participants.stream().map(participant -> notificationBuilder(participant.getUser(), NotificationDataSet.CHALLENGE_DESTROYED, notificationBody)).toList();
        notificationBulkSendService.sendAll(notifications);
    }

    @Async
    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendNotification(ChallengeReadiedEvent event) {
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(event.getChallengeId());
        Map<String, String> notificationBody = new HashMap<>();
        setChallengeId(notificationBody, event.getChallengeId());
        setTotalChattingRoomId(notificationBody, event.getTotalChattingRoomId());

        List<Notification> totalNotifications = new ArrayList<>();

        // 레드팀 먼저
        if(CompetitionType.TEAM.equals(event.getType())) {
            List<ChallengeParticipant> blueTeam = participants.stream().filter(participant -> participant.getType().equals(ChallengeParticipantType.BLUE)).toList();
            setMyTeamChattingRoomId(notificationBody, event.getBlueTeamChattingRoomId());
            List<Notification> blueNotifications = blueTeam.stream().map(participant -> notificationBuilder(participant.getUser(), NotificationDataSet.CHALLENGE_READY, notificationBody)).toList();


            List<ChallengeParticipant> redTeam = participants.stream().filter(participant -> participant.getType().equals(ChallengeParticipantType.BLUE)).toList();
            setMyTeamChattingRoomId(notificationBody, event.getRedTeamChattingRoomId());
            List<Notification> redNotifications = redTeam.stream().map(participant -> notificationBuilder(participant.getUser(), NotificationDataSet.CHALLENGE_READY, notificationBody)).toList();
            totalNotifications.addAll(blueNotifications);
            totalNotifications.addAll(redNotifications);
        }else {
            List<Notification> notifications = participants.stream().map(participant -> notificationBuilder(participant.getUser(), NotificationDataSet.CHALLENGE_READY, notificationBody)).toList();
            totalNotifications = notifications;
        }
        notificationBulkSendService.sendAll(totalNotifications);
    }

    @Getter
    @AllArgsConstructor
    private enum NotificationDataSet {
        CHALLENGE_READY("챌린지 시작 준비 완료", "챌린지가 시작 준비 되었습니다!", "CHALLENGE_READY"),
        CHALLENGE_DESTROYED("챌린지 팀원 부족", "챌린지가 시작되지 못했습니다.", "CHALLENGE_DESTORYED"),
        CHALLENGE_START("챌린지 시작", "챌린지가 시작되었습니다!", "CHALLENGE_START"),
        ;
        private final String title;
        private final String body;
        private final String type;
    }



    private Map<String, String> setChallengeId (Map<String, String> data, UUID challengeId) {
        data.put("challengeId", challengeId.toString());
        return data;
    }

    private Map<String, String> setMyTeamChattingRoomId (Map<String, String> data, UUID myTeamChattingRoomId) {
        data.put("myTeamChattingRoomId", myTeamChattingRoomId.toString());
        return data;
    }

    private Map<String, String> setTotalChattingRoomId (Map<String, String> data, UUID totalChattingRoomId) {
        data.put("totalChattingRoomId", totalChattingRoomId.toString());
        return data;
    }


    private Notification notificationBuilder(User user, NotificationDataSet dataSet, Map<String, String> data) {
        return Notification.builder()
                .title(dataSet.title)
                .body(dataSet.body)
                .user(user)
                .data(data)
                .build();
    }
}
