package com.ggul.application.chatting.domain.repository;

import com.ggul.application.chatting.domain.ChattingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, UUID> {
}
