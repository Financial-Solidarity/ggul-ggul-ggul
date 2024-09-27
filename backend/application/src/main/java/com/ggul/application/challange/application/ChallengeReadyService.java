package com.ggul.application.challange.application;

import com.ggul.application.challange.application.dto.ChallengeReadyRequest;
import com.ggul.application.challange.domain.Challenge;
import com.ggul.application.challange.domain.ChallengeParticipant;
import com.ggul.application.challange.domain.ChallengeParticipantType;
import com.ggul.application.challange.domain.CompetitionType;
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

    @Transactional
    public void ready(ChallengeReadyRequest request, UUID ownerId) {
        Challenge target = challengeRepository.findById(request.getChallengeId()).orElseThrow(ChallengeNotFoundException::new);
        User owner = userRepository.getReferenceById(ownerId);

        if(!target.isOwner(owner)) {
            throw new ChallengeNotAuthorizedException();
        }

        List<ChattingRoom> chattingRooms = chattingRoomGenerateService.generateAll(target);

        if(target.getCompetitionType().equals(CompetitionType.TEAM)) {
            List<ChallengeParticipant> redTeam = challengeParticipantRepository.findChallengeParticipantByChallenge_IdAndType(request.getChallengeId(), ChallengeParticipantType.RED);
            List<ChallengeParticipant> blueTeam = challengeParticipantRepository.findChallengeParticipantByChallenge_IdAndType(request.getChallengeId(), ChallengeParticipantType.BLUE);

            if(redTeam.size() != blueTeam.size()) {
                throw new ChallengeParticipantNotMatchException();
            }

            chattingRoomJoinService.joinAll(chattingRooms.get(0), blueTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(1), redTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(2), redTeam);
            chattingRoomJoinService.joinAll(chattingRooms.get(2), blueTeam);

        }else {
            List<ChallengeParticipant> solo = challengeParticipantRepository.findChallengeParticipantByChallenge_IdAndType(request.getChallengeId(), ChallengeParticipantType.PERSONAL);

            if(solo.size() < 2) {
                throw new ChallengeParticipantNotMatchException();
            }
            chattingRoomJoinService.joinAll(chattingRooms.get(0), solo);
        }



        target.ready();

        ChallengeReadiedEvent build = ChallengeReadiedEvent.builder().challengeId(target.getId())
                .type(target.getCompetitionType())
                .blueTeamChattingRoomId(chattingRooms.get(0).getId())
                .redTeamChattingRoomId(chattingRooms.get(1).getId())
                .totalChattingRoomId(chattingRooms.get(2).getId())
                .build();
        Events.raise(build);
    }
}
