package com.ggul.application.chatting.domain.repository;

import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.ui.dto.ChattingRoomInfoView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, UUID> {
    List<ChattingRoom> findAllByChallenge_Id(UUID challengeId);

}
