package com.ggul.application.challange.domain;

import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.common.domain.password.Password;
import com.ggul.application.common.domain.password.PasswordConverter;
import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
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
@Table
@Entity(name = "challange")
public class Challenge extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    @UUIDv7
    private UUID id;

    @Column(name = "challenge_title")
    private String title;

    @Column(name = "challenge_password_exist")
    private Boolean passwordExist;

    @Convert(converter = PasswordConverter.class)
    @Column(name = "challenge_password")
    private Password password;

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

    public static Challenge createChallengeRoom(ChallengeRegisterRequest request, User owner) {
        return Challenge.builder()
                .budgeCap(request.getBudgetCap())
                .title(request.getTitle())
                .competitionType(CompetitionType.of(request.getCompetitionType()))
                .isBlindness(request.getIsBlindness())
                .password(request.getPassword() != null ? Password.of(request.getPassword(), false) : null)
                .owner(owner)
                .build();
    }

    @PrePersist
    protected void onCreate() {
        passwordExist = password == null;
        isStarted = false;
        isEnded = false;

    }
}
