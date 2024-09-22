package com.ggul.application.chatting.application;

import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomParticipant;
import com.ggul.application.chatting.domain.repository.ChattingRoomParticipantRepository;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.exception.ChattingRoomParticipantExistException;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChattingRoomJoinService {
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChattingRoomParticipantRepository chattingRoomParticipantRepository;
    private final UserRepository userRepository;

    @Transactional
    public UUID chattingRoomJoin(UUID chattingRoomId, UUID userId) {
        if(chattingRoomParticipantRepository.existsByChattingRoom_IdAndUser_Id(chattingRoomId, userId)) {
            throw new ChattingRoomParticipantExistException();
        }
        ChattingRoom chattingRoom = chattingRoomRepository.findById(chattingRoomId).orElse(null);

        ChattingRoomParticipant join = chattingRoom.join(userRepository.getReferenceById(userId));
        return chattingRoomParticipantRepository.save(join).getId();
    }
}
