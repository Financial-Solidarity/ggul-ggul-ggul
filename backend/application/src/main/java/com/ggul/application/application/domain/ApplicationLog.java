package com.ggul.application.application.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "application_log")
@Entity
@AttributeOverride(name = "createdAt", column = @Column(name = "applicated_at"))
public class ApplicationLog extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "application_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "application_item_id")
    private ApplicationItem applicationItem;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
