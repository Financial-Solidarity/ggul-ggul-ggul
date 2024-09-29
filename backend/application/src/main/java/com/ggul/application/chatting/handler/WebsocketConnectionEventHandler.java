package com.ggul.application.chatting.handler;

import com.ggul.application.fcmtoken.application.FcmTokenUpdateService;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.springconfig.security.token.JsonLoginAuthenticationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class WebsocketConnectionEventHandler implements ApplicationListener<SessionConnectedEvent> {
    @Autowired
    private FcmTokenUpdateService fcmTokenUpdateService;

    @Override
    public void onApplicationEvent(SessionConnectedEvent event) {
        String simSessionId = (String) event.getMessage().getHeaders().get("simpSessionId");
        GenericMessage simpConnectMessage = (GenericMessage) event.getMessage().getHeaders().get("simpConnectMessage");
        ConcurrentHashMap<String, Object> simpSessionAttributes = (ConcurrentHashMap) simpConnectMessage.getHeaders().get("simpSessionAttributes");
        String sessionId = simpSessionAttributes.get("HTTP.SESSION.ID").toString();
        UUID userId = ((UserLoginContext) ((JsonLoginAuthenticationToken) event.getUser()).getPrincipal()).getUserId();
        fcmTokenUpdateService.updateFcmToken(userId, sessionId, simSessionId);
    }

    @EventListener
    public void sessionDisconnectedEvent(SessionDisconnectEvent event) {
        UUID userId = ((UserLoginContext) ((JsonLoginAuthenticationToken) event.getUser()).getPrincipal()).getUserId();
        log.info("User {} disconnected", userId);
        fcmTokenUpdateService.updateFcmTokenToBackground(userId, event.getSessionId());
    }
}
