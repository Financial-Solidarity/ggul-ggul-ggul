package com.ggul.application.challange.domain;

import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.challange.exception.ChallengePasswordNotMatchException;
import com.ggul.application.common.domain.password.Password;
import com.ggul.application.common.domain.password.PasswordConverter;
import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SoftDelete;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenge")
@Entity
@SoftDelete(columnName = "is_deleted")
public class Challenge extends SoftDeleteEntity {
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

    @Column(name = "challenge_budget_cap")
    private Integer budgetCap;

    @Column(name = "challenge_is_ready")
    private Boolean isReady;

    @Column(name = "challenge_is_ended")
    private Boolean isEnded;

    @Column(name = "challenge_started_at")
    private LocalDateTime startedAt;

    @Column(name = "challenge_ended_at")
    private LocalDateTime endedAt;

    public static Challenge createChallengeRoom(ChallengeRegisterRequest request, User owner) {
        return Challenge.builder()
                .budgetCap(request.getBudgetCap())
                .title(request.getTitle())
                .competitionType(CompetitionType.of(request.getCompetitionType()))
                .isBlindness(request.getIsBlindness())
                .password(request.getPassword() != null ? Password.of(request.getPassword(), false) : null)
                .owner(owner)
                .startedAt(request.getStartDate().atStartOfDay())
                .endedAt(request.getEndDate().atStartOfDay())
                .limitParticipant(request.getLimitParticipant())
                .build();
    }

    public boolean isOwner(User user) {
        return owner.equals(user);
    }

    public void ready() {
        this.isReady = true;
    }

    @Override
    protected void prePersistAction() {
        passwordExist = password == null;
        isReady = false;
        isEnded = false;
    }

    public ChallengeParticipant join(User user, ChallengeParticipantType participantType, Password password) {
        if(passwordExist) {
            if (!this.password.equals(password)) {
                throw new ChallengePasswordNotMatchException();
            }
        }
        return ChallengeParticipant.builder()
                .challenge(this)
                .type(participantType)
                .user(user)
                .build();
    }
}
