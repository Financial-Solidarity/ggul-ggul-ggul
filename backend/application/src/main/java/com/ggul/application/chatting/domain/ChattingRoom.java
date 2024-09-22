package com.ggul.application.chatting.domain;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chatting_room")
@Entity
public class ChattingRoom extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "chatting_room_id")
    @UUIDv7
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Convert(converter = ChattingRoomTypeConverter.class)
    @Column(name = "chatting_room_type")
    private ChattingRoomType type;

    public static ChattingRoom create(Challenge challenge, ChattingRoomType.Type type) {
        return ChattingRoom.builder().challenge(challenge).type(new ChattingRoomType(type)).build();
    }

    public ChattingRoomParticipant join(User user) {
        return ChattingRoomParticipant.builder().chattingRoom(this).user(user).build();
    }
}
