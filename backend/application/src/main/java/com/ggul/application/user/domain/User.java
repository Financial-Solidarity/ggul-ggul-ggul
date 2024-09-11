package com.ggul.application.user.domain;

import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@Entity
public class User extends SoftDeleteEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_id", columnDefinition = "BINARY(16)")
    @UUIDv7
    private UUID id;

    @Column
    private String username;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_profile")
    private String profile;

}
