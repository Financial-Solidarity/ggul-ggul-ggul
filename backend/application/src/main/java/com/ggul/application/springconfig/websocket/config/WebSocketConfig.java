package com.ggul.application.springconfig.websocket.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.session.Session;
import org.springframework.session.web.socket.config.annotation.AbstractSessionWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractSessionWebSocketMessageBrokerConfigurer<Session> {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void configureStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp/connection") // ex ) ws://localhost:8080/stomp/chat
                .setAllowedOriginPatterns("https://ggul3.kro.kr", "http://localhost:5173", "http://localhost:4173") // 복수의 Origin 패턴 설정
                .addInterceptors(new HttpSessionHandshakeInterceptor());

        registry.addEndpoint("/stomp/connection") // ex ) ws://localhost:8080/stomp/chat
                .setAllowedOriginPatterns("https://ggul3.kro.kr", "http://localhost:5173", "http://localhost:4173") // 복수의 Origin 패턴 설정
                .addInterceptors(new HttpSessionHandshakeInterceptor())
                .withSockJS();
    }

//    @Override
//    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
//        registration.setMessageSizeLimit(8192) // 메세지 크기 제한 설정
//                .setSendTimeLimit(20 * 10000) // 전송 시간 제한 설정
//                .setSendBufferSizeLimit(3 * 512 * 1024); // 버퍼 크기 제한 설정
//    }
}
