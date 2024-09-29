package com.ggul.application.fcmtoken.domain;

import com.ggul.application.common.jpa.domain.UUIDConverter;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fcm_token")
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

    @Convert(converter = UUIDConverter.class)
    @Column(name = "session_id")
    private String sessionId;

    @Convert(converter = UUIDConverter.class)
    @Column(name = "web_socket_session_id")
    private String webSocketSessionId;

    @Column(name = "is_foreground")
    private Boolean isForeground;

    @PrePersist
    protected void onCreate() {
        isForeground = true;
    }

    public void onForeground() {
        isForeground = true;
    }

    public void onBackground() {
        isForeground = false;
    }

    public void setWebSocketSessionId(String webSocketSessionId) {
        this.webSocketSessionId = webSocketSessionId;
    }
}
