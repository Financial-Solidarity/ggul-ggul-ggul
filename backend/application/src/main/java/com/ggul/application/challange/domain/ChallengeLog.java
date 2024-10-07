package com.ggul.application.challange.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenge_log")
@Entity
@DynamicUpdate
public class ChallengeLog extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "challenge_log_id")
    @UUIDv7
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_participant_id")
    private ChallengeParticipant participant;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Column(name = "is_success")
    private Boolean isSuccess;

    @Column(name = "is_lose")
    private Boolean isLose;

    @Column(name = "ggul_num")
    private Integer ggulNum;
}
