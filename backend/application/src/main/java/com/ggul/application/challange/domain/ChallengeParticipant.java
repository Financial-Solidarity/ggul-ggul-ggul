package com.ggul.application.challange.domain;

import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.Objects;
import java.util.UUID;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "createdAt", column = @Column(name = "participated_at"))
@Table(name = "challenge_participant")
@Entity
@SQLRestriction("is_deleted = false")
@SQLDelete(sql = "UPDATE challenge_participant SET is_deleted = true WHERE challenge_participant_id = ? ")
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

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile")
    private String profile;

    @Convert(converter = ChallengeParticipantTypeConverter.class)
    @Column(name = "challenge_participant_type")
    private ChallengeParticipantType type;


    public void teamChangeToggle() {
        if(type.equals(ChallengeParticipantType.BLUE)) {
            type = ChallengeParticipantType.RED;
        }
        else if(type.equals(ChallengeParticipantType.RED)) {
            type = ChallengeParticipantType.BLUE;
        }
    }

    @Override
    public boolean equals(Object o) {
        if(o == null) {
            return false;
        }
        if(o instanceof ChallengeParticipant) {
            ChallengeParticipant target = (ChallengeParticipant) o;
            return Objects.equals(target.getId(), this.id);
        }else {
            return false;
        }
    }

    public ChallengeLog isWin(Boolean isWin, Long ggul, Boolean isSuccess) {
        return ChallengeLog.builder()
                .participant(this)
                .challenge(challenge)
                .isLose(!isSuccess || Objects.equals(ChallengeParticipantType.PERSONAL, this.type) ? null : isWin)
                .isSuccess(isSuccess)
                .ggulNum(ggul.intValue())
                .build();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(Objects.requireNonNullElse(this.id, this));
    }

}

