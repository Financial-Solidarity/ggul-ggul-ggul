package com.ggul.application.chatting.domain.repository;

import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChattingRoomParticipantRepository extends JpaRepository<ChattingRoomParticipant, UUID> {

    Boolean existsByChattingRoom_IdAndUser_Id(UUID chattingRoomId, UUID userId);
}
