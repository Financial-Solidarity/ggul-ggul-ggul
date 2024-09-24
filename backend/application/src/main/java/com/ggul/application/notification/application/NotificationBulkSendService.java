package com.ggul.application.notification.application;

import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import com.ggul.application.fcmtoken.infra.FirebaseCloudMessageService;
import com.ggul.application.notification.domain.Notification;
import com.ggul.application.notification.domain.NotificationRepository;
import com.ggul.application.user.domain.User;
import com.google.firebase.messaging.MulticastMessage;
import jakarta.mail.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class NotificationBulkSendService {
    private final NotificationRepository notificationRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;


    public void sendAll(List<Notification> lists) {
        List<MulticastMessage> mlists = new ArrayList<>();
        for(Notification noti : lists) {
            MulticastMessage multicastMessage = FirebaseCloudMessageService.generateMulticastMessage(noti.getUser().getFcmTokens(), noti.getTitle(), noti.getBody(), noti.getType().name(), noti.getMap());
            mlists.add(multicastMessage);
        }
        firebaseCloudMessageService.sendDataMessageTo(mlists);
        notificationRepository.saveAll(lists);
    }
}
