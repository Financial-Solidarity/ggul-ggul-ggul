package com.ggul.application.notification.application;

import com.ggul.application.fcmtoken.domain.FcmToken;
import com.ggul.application.fcmtoken.infra.FirebaseCloudMessageService;
import com.ggul.application.notification.domain.Notification;
import com.ggul.application.notification.domain.NotificationRepository;
import com.google.firebase.messaging.MulticastMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationSendService {
    private final NotificationRepository notificationRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;


    @Transactional
    public void sendAllAndPersist(List<Notification> lists) {
        List<MulticastMessage> mlists = new ArrayList<>();
        for(Notification noti : lists) {
            List<FcmToken> tokens = noti.getUser().getFcmTokens();
            if(tokens.size() != 0) {
                MulticastMessage multicastMessage = FirebaseCloudMessageService.generateMulticastMessage(noti.getUser().getFcmTokens(), noti.getTitle(), noti.getBody(), noti.getType().name(), noti.getData(), false);
                mlists.add(multicastMessage);
            }
        }
        notificationRepository.saveAll(lists);
        firebaseCloudMessageService.sendDataMessageTo(mlists);
    }
}
