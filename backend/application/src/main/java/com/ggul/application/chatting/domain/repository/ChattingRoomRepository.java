package com.ggul.application.chatting.domain.repository;

import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, UUID> {
    List<ChattingRoom> findAllByChallenge_Id(UUID challengeId);

    Optional<ChattingRoom> findByChallenge_IdAndType(UUID challengeId, ChattingRoomType type);

}
