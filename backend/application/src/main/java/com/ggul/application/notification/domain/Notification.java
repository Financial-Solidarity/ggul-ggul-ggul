package com.ggul.application.notification.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.Map;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@Table(name = "notification")
@Entity
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    @UUIDv7
    private UUID id;

    @Column(name = "notification_title")
    private String title;

    @Column(name = "notification_body")
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type")
    private NotificationType type;

    @Lob
    @Column(name = "data")
    private Map<String, String> data;

}
