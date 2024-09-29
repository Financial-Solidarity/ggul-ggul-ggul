package com.ggul.application.chatting.handler;

import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Slf4j
@Component
public class WebsocketConnectionEventHandler implements ApplicationListener<SessionConnectEvent> {


    @Override
    public void onApplicationEvent(SessionConnectEvent event) {
        UserLoginContext loginContext = (UserLoginContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("{}", loginContext.getUserId());
    }
}
