import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetChattingRoomList } from '../reactQueries/useChattingRoomQuery';
import { useFindChattingRoomStore } from '../store/findChattingRoomStore';

export const ChattingRoomPage = () => {
  const navigate = useNavigate();
  const { data } = useGetChattingRoomList();
  const { challengeId, chattingRoomId } = useFindChattingRoomStore();

  const toSoloChattingRoom = () => {
    navigate(`/challenge/solo-chatting/${challengeId}`, { replace: true });
  };

  const toTotalChattingRoom = () => {
    navigate(`/challenge/total-chatting/${challengeId}`, { replace: true });
  };

  const toTeamChattingRoom = () => {
    navigate(`/challenge/team-chatting/${challengeId}`, { replace: true });
  };

  useEffect(() => {
    if (!data) return;
    data.forEach((chattingRoom) => {
      if (chattingRoom.challenge.challengeId === challengeId) {
        if (chattingRoom.challenge.competitionType === 'S') {
          console.log('솔로');
          toSoloChattingRoom();
        } else if (
          chattingRoom.myTeamChattingRoom?.chattingRoomId === chattingRoomId
        ) {
          console.log('전쳇');

          toTotalChattingRoom();
        } else if (
          chattingRoom.totalChattingRoom.chattingRoomId === chattingRoomId
        ) {
          console.log('팀챗');

          toTeamChattingRoom();
        }
      }
    });
  }, [data, challengeId, chattingRoomId]);

  return <></>;
};
