package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeReadyRequest;
import com.ggul.application.challange.domain.*;
import com.ggul.application.challange.domain.repository.BlindNicknameRepository;
import com.ggul.application.challange.domain.repository.ChallengeParticipantRepository;
import com.ggul.application.challange.domain.repository.ChallengeRepository;
import com.ggul.application.challange.event.ChallengeReadiedEvent;
import com.ggul.application.challange.exception.ChallengeNotAuthorizedException;
import com.ggul.application.challange.exception.ChallengeNotFoundException;
import com.ggul.application.challange.exception.ChallengeParticipantNotMatchException;
import com.ggul.application.chatting.application.ChattingRoomGenerateService;
import com.ggul.application.chatting.application.ChattingRoomJoinService;
import com.ggul.application.chatting.domain.ChattingRoom;
import com.ggul.application.common.event.Events;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChallengeReadyService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final ChallengeParticipantRepository challengeParticipantRepository;
    private final ChattingRoomGenerateService chattingRoomGenerateService;
    private final ChattingRoomJoinService chattingRoomJoinService;
    private final BlindNicknameRepository blindNicknameRepository;

    @Transactional
    public void ready(ChallengeReadyRequest request, UUID ownerId) {
        Challenge target = challengeRepository.findById(request.getChallengeId()).orElseThrow(ChallengeNotFoundException::new);
        User owner = userRepository.getReferenceById(ownerId);

        if (!target.isOwner(owner)) {
            throw new ChallengeNotAuthorizedException();
        }
        List<ChallengeParticipant> participants = challengeParticipantRepository.findAllByChallenge_Id(request.getChallengeId());

        List<ChattingRoom> chattingRooms = chattingRoomGenerateService.generateAll(target);
        ChallengeReadiedEvent build = null;
        if (target.getCompetitionType().equals(CompetitionType.TEAM)) {
            List<ChallengeParticipant> redTeam = participants.stream().filter(challengeParticipant -> challengeParticipant.getType().equals(ChallengeParticipantType.RED)).toList();
            List<ChallengeParticipant> blueTeam = participants.stream().filter(challengeParticipant -> challengeParticipant.getType().equals(ChallengeParticipantType.BLUE)).toList();

            if (redTeam.size() != blueTeam.size()) {
                throw new ChallengeParticipantNotMatchException();
            }

            chattingRoomJoinService.joinAll(chattingRooms.get(0), blueTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(1), redTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(2), redTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(2), blueTeam);

            build = ChallengeReadiedEvent.builder().challengeId(target.getId())
                    .type(target.getCompetitionType())
                    .blueTeamChattingRoomId(chattingRooms.get(0).getId())
                    .redTeamChattingRoomId(chattingRooms.get(1).getId())
                    .totalChattingRoomId(chattingRooms.get(2).getId())
                    .build();

        } else {
            List<ChallengeParticipant> solo = participants;

            if (solo.size() < 2) {
                throw new ChallengeParticipantNotMatchException();
            }
            chattingRoomJoinService.joinAll(chattingRooms.get(0), solo);

            build = ChallengeReadiedEvent.builder().challengeId(target.getId())
                    .type(target.getCompetitionType())
                    .totalChattingRoomId(chattingRooms.get(0).getId())
                    .build();
        }


        target.ready();
        if (target.getIsBlindness()) {
            List<BlindNickname> all = blindNicknameRepository.findAll();
            for (int i = 0; i < participants.size(); i++) {
                ChallengeParticipant participant = participants.get(i);
                participant.setBlindNickname(all.get(i).getNickname());
            }
        }

        Events.raise(build);
    }
}
