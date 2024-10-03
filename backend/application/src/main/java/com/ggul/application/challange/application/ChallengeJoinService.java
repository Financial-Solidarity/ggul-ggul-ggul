package com.ggul.application.challange.application;

import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeParticipantChangedEvent;
import com.ggul.application.challange.exception.ChallengeNotFoundException;
import com.ggul.application.challange.exception.ChallengeParticipantExistException;
import com.ggul.application.challange.exception.ChallengeParticipantLimitException;
import com.ggul.application.challange.query.ChallengeParticipantFindService;
import com.ggul.application.chatting.application.ChattingRoomJoinService;
import com.ggul.application.chatting.domain.Chatting;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.chatting.domain.ChattingRoomType;
import com.ggul.application.chatting.domain.repository.ChattingRoomRepository;
import com.ggul.application.chatting.query.ChattingRoomFindService;
import com.ggul.application.common.domain.password.Password;
import com.ggul.application.common.event.Events;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeJoinService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final UserRepository userRepository;
    private final ChattingRoomRepository chattingRoomRepository;
    private final ChallengeParticipantFindService challengeParticipantFindService;
    private final ChattingRoomJoinService chattingRoomJoinService;
    private final ChattingRoomFindService chattingRoomFindService;

    @Transactional
    public UUID join(UUID challengeId, UUID userId, Password password) {
        //TODO : 현재 챌린지 참여시 참여중인 챌린지가 있는지 검증하는 로직 추가.
        if(challengeRepository.findByIsEndedFalse(userId).isPresent()) {
            throw new ChallengeParticipantExistException();
        }

        if (challengeParticipantRepository.existsByChallenge_IdAndUser_Id(challengeId, userId)) {
            throw new ChallengeParticipantExistException();
        }

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(ChallengeNotFoundException::new);

        if(Objects.equals(challengeParticipantRepository.countByChallenge_Id(challengeId), challenge.getLimitParticipant())) {
            throw new ChallengeParticipantLimitException();
        }


        User user = userRepository.findById(userId).orElseThrow();
        ChallengeParticipant join = challenge.join(user, challenge.getCompetitionType().getType().equals(CompetitionType.Type.SOLO) ? ChallengeParticipantType.PERSONAL : challengeParticipantFindService.allocateParticipantType(challengeId), password);
        Events.raise(new ChallengeParticipantChangedEvent(challengeId, join.getId(), join.getNickname(), join.getProfile(), challenge.isOwner(user), join.getType(), false, true));
        return challengeParticipantRepository.save(join).getId();
    }

    @Transactional
    public void joinLobby(UUID challengeId, UUID userId, Password password) {
        UUID participantId = join(challengeId, userId, password);
        ChattingRoom lobby = chattingRoomRepository.findByChallenge_IdAndType(challengeId, ChattingRoomType.LOBBY).orElseThrow();
        chattingRoomJoinService.join(lobby.getId(), participantId);

    }

}
