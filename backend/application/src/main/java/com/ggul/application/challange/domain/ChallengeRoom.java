package com.ggul.application.challange.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "challangeroom")
public class ChallengeRoom extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    @UUIDv7
    private UUID id;

    @Column(name = "challenge_title")
    private String title;

    @Column(name = "challenge_password_exist")
    private Boolean passwordExist;

    @Column(name = "challenge_password")
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_owner_id")
    private User owner;

    @Convert(converter = CompetitionTypeConverter.class)
    @Column(name = "challenge_competition_type")
    private CompetitionType competitionType;

    @Column(name = "challenge_is_blindness")
    private Boolean isBlindness;

    @Column(name = "challenge_limit_participant")
    private Integer limitParticipant;

    @Column(name = "challenge_budge_cap")
    private Integer budgeCap;

    @Column(name = "challenge_is_started")
    private Boolean isStarted;

    @Column(name = "challenge_is_ended")
    private Boolean isEnded;

    @Column(name = "challenge_started_at")
    private LocalDateTime startedAt;

    @Column(name = "challenge_ended_at")
    private LocalDateTime endedAt;
}
