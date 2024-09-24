package com.ggul.application.fcmtoken.domain;

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
public class FcmToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fcm_token_id")
    private Integer id;

    @Column(name = "fcm_token")
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
