package com.ggul.application.ggul.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
public class GgulLog extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "ggul_log_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "ggul_num")
    private Integer num;

}
