package com.ggul.application.notification.application;

import com.ggul.application.fcmtoken.infra.FirebaseCloudMessageService;
import com.ggul.application.notification.domain.Notification;
import com.ggul.application.notification.domain.NotificationRepository;
import com.google.firebase.messaging.MulticastMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationSendService {
    private final NotificationRepository notificationRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;


    public void sendAllAndPersist(List<Notification> lists) {
        List<MulticastMessage> mlists = new ArrayList<>();
        for(Notification noti : lists) {
            MulticastMessage multicastMessage = FirebaseCloudMessageService.generateMulticastMessage(noti.getUser().getFcmTokens(), noti.getTitle(), noti.getBody(), noti.getType().name(), noti.getData());
            mlists.add(multicastMessage);
        }
        firebaseCloudMessageService.sendDataMessageTo(mlists);
        notificationRepository.saveAll(lists);
    }
}
