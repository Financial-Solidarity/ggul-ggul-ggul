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
@Table(name = "chatting")
@Entity
public class Chatting extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatting_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "challenge_participant_id")
    private ChallengeParticipant participant;

    @ManyToOne
    @JoinColumn(name = "chatting_room_id")
    private ChattingRoom chattingRoom;



    public enum Type {
        COMMON, SPEND, JUSTIFICATION
    }

    @Column(name = "type")
    @Enumerated(EnumType.ORDINAL)
    private Type type;

    @Column(name = "chatting_content")
    private String content;

    @Column(name = "consumption_category_name")
    private String categoryName;

    @Column(name = "consumption_balance")
    private Integer balance;


}
