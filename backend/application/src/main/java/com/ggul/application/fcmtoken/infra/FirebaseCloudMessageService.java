package com.ggul.application.fcmtoken.infra;

import com.ggul.application.fcmtoken.domain.FcmToken;
import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class FirebaseCloudMessageService {


    public static MulticastMessage generateMulticastMessage(List<FcmToken> targetTokens, String title, String body, String type, Map<String, String> values) {
        return MulticastMessage.builder()
                .putData("time", LocalDateTime.now().toString())
                .putData("title", title)
                .putData("body", body)
                .putData("type", type)
                .putAllData(values)
                .addAllTokens(targetTokens.stream().filter(fcmToken -> !fcmToken.getIsForeground()).map(FcmToken::getToken).toList())
                .setApnsConfig(ApnsConfig.builder().setAps(Aps.builder().setContentAvailable(true).build()).putHeader("apns-priority", "10").build())
                .setNotification(Notification.builder()
                        .setBody(body).setTitle(title)
                        .build())
                .setWebpushConfig(WebpushConfig.builder().setNotification(WebpushNotification.builder().setBody(body).setTitle(title).build()).build())
                .setAndroidConfig(AndroidConfig.builder().setPriority(AndroidConfig.Priority.HIGH).build())
                .build();
    }

    public static Message generateMessage(FcmToken targetToken, String title, String body, String type, Map<String, String> values) {
        return Message.builder()
                .putData("time", LocalDateTime.now().toString())
                .putData("title", title)
                .putData("body", body)
                .putData("type", type)
                .putAllData(values)
                .setToken(targetToken.getToken())
                .setApnsConfig(ApnsConfig.builder().setAps(Aps.builder().setContentAvailable(true).build()).putHeader("apns-priority", "10").build())
                .setNotification(Notification.builder()
                        .setBody(body).setTitle(title)
                        .build())
                .setWebpushConfig(WebpushConfig.builder().setNotification(WebpushNotification.builder().setBody(body).setTitle(title).build()).build())
                .setAndroidConfig(AndroidConfig.builder().setPriority(AndroidConfig.Priority.HIGH).build())
                .build();
    }

    public String sendDataMessageTo(Message msg) throws FirebaseMessagingException {
        return sendMessageTo(msg);
    }

    public BatchResponse sendDataMessageTo(MulticastMessage multicastMessage) throws FirebaseMessagingException {
        return FirebaseMessaging.getInstance().sendEachForMulticast(multicastMessage);
    }

    public List<BatchResponse> sendDataMessageTo(List<MulticastMessage> multicastMessage){
        return multicastMessage.stream().map(multicastMessage1 -> {
            try {
                return sendDataMessageTo(multicastMessage1);
            } catch (FirebaseMessagingException ignored) {
                return new BatchResponse() {
                    @Override
                    public List<SendResponse> getResponses() {
                        return null;
                    }

                    @Override
                    public int getSuccessCount() {
                        return 0;
                    }

                    @Override
                    public int getFailureCount() {
                        return 0;
                    }
                };
            }
        }).toList();
    }

    public String sendMessageTo(Message message) throws FirebaseMessagingException {

        return FirebaseMessaging.getInstance().send(message);
    }

}
