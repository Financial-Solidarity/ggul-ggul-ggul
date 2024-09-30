package com.ggul.application.chatting.domain.repository;

import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChattingRoomParticipantRepository extends JpaRepository<ChattingRoomParticipant, UUID> {

    Boolean existsByChattingRoom_IdAndChallengeParticipant_Id(UUID chattingRoomId, UUID userId);


    @Query("SELECT cp FROM ChattingRoomParticipant crp  JOIN ChallengeParticipant cp ON crp.challengeParticipant = cp WHERE crp.chattingRoom.id = :chattingRoomId")
    List<ChallengeParticipant> findAllChallengeParticipantByChattingRoomId(UUID chattingRoomId);
}
