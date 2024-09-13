package com.ggul.application.user.domain;

import com.ggul.application.common.domain.password.Password;
import com.ggul.application.common.domain.password.PasswordConverter;
import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
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

    @Convert(converter = PasswordConverter.class)
    @Column(name = "user_password")
    private Password password;

    @Column(name = "user_profile")
    private String profile;

}
