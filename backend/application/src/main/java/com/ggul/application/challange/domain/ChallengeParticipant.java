package com.ggul.application.challange.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
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
@Table(name = "challenge_participant")
@Entity
public class ChallengeParticipant extends SoftDeleteEntity {
    @Id
    @GeneratedValue
    @Column(name = "challenge_participant_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Convert(converter = ChallengeParticipantTypeConverter.class)
    @Column(name = "challenge_particiapant_type")
    private ChallengeParticipantType type;
}
