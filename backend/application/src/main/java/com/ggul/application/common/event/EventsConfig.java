package com.ggul.application.common.event;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EventsConfig {
    @Autowired
    private ApplicationContext applicationContext;

    @Bean
    public InitializingBean setEventApplicationPublisher() {
        return () -> Events.setApplicationEventPublisher(applicationContext);
    }
}
