package com.ggul.application.chatting.domain.repository;

import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.ui.dto.ChattingRoomInfoView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ChattingRepository extends JpaRepository<Chatting, UUID> {

    public interface ChattingBadgeCount {
        Long getCount();
    }

    @Query("SELECT COUNT(c.id) as count " +
            "FROM Chatting c " +
            "JOIN ChattingRoom cr ON c.chattingRoom.id = cr.id " +
            "WHERE c.id = :chattingRoomId " +
            " AND c.createdAt BETWEEN ( SELECT cp.lastConnectedAt FROM ChattingRoomParticipant cp WHERE cp.challengeParticipant.user.id = :sessionId ) AND NOW() ")
    ChattingBadgeCount countByChattingRoomAndParticipantId(@Param("chattingRoomId") UUID chattingRoomId, @Param("sessionId")UUID sessionId);

    Chatting findFirstByChattingRoom_IdOrderByCreatedAtDesc(UUID chattingRoomId);
}
