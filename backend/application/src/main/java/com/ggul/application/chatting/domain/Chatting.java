package com.ggul.application.chatting.domain;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.common.jpa.domain.BaseEntity;
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
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type")
@Table
@Entity
public abstract class Chatting extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatting_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "challenge_participant_id")
    private ChallengeParticipant participant;

    @ManyToOne
    @JoinColumn(name = "chatting_room")
    private ChattingRoom chattingRoom;

    public enum Type {
        COMMON, SPEND, JUSTIFICATION
    }

    @Transient
    public abstract Type getType();
}
