package com.ggul.application.common.event;

import org.springframework.context.ApplicationEventPublisher;

public class Events {
    private static ApplicationEventPublisher applicationEventPublisher;

    static void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        Events.applicationEventPublisher = applicationEventPublisher;
    }

    public void raise(Object object) {
        if(applicationEventPublisher != null) {
            applicationEventPublisher.publishEvent(object);
        }
    }
}
