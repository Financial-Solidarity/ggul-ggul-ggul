package com.ggul.application.game.domain;

import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "game")
@Entity
public class Game {
    @Id
    @Column(name = "user_id")
    private UUID id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "last_received_at")
    private LocalDateTime lastReceivedAt;

    @PrePersist
    protected void onCreate() {
        lastReceivedAt = LocalDateTime.now();
    }

    public void changeLastReceiveAt(LocalDateTime lastReceivedAt) {
        this.lastReceivedAt = lastReceivedAt;
    }

}
