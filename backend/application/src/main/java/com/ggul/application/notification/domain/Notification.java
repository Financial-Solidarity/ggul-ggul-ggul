package com.ggul.application.notification.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "notification_type")
@Table(name = "notification")
@Entity
public abstract class Notification extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    @UUIDv7
    private UUID id;

    @Column
    private String title;

    @Column
    private String body;


    public abstract String getType();
}
