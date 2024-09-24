package com.ggul.application.chatting.domain;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatting_room_participant")
@Entity
public class ChattingRoomParticipant extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatting_room_participant_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatting_room_id")
    private ChattingRoom chattingRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_participant_id")
    private ChallengeParticipant challengeParticipant;

    @Column(name = "last_connected_at")
    private LocalDateTime lastConnectedAt;

    @PrePersist
    protected void onCreate() {
        lastConnectedAt = LocalDateTime.now();
    }
}
