import { Button, Divider } from '@nextui-org/react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';
import {
  useChangeTeam,
  useGetParticipantList,
} from '../../reactQueries/useChallengeQuery';

import { Participant } from './Participant';

import { Drawer } from '@/modules/common/components/Drawer';

interface TeamDrawerProps {
  isOpen: boolean;
  challengeId: string;
  onClose: () => void;
}
export const TeamDrawer = ({
  isOpen,
  challengeId,
  onClose,
}: TeamDrawerProps) => {
  const { setIsExitConfirmModalOpen } = useWaitingRoomStore();
  const { data: participantList } = useGetParticipantList(challengeId);
  const participantId = participantList.find(
    (participant) => participant.isMine,
  )?.participantId;
  const { mutate: changeTeam, isPending: isChangeTeamLoading } =
    useChangeTeam();

  const openExitConfirmModal = () => {
    setIsExitConfirmModalOpen(true);
  };

  const teamA = participantList.filter(
    (participant) => participant.type === 'RED',
  );
  const teamB = participantList.filter(
    (participant) => participant.type === 'BLUE',
  );

  const handleChangeTeam = () => {
    if (!participantId) return;
    changeTeam(participantId);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <h5 className="text-lg font-bold">참가자</h5>
          <button
            className="flex items-center gap-1 rounded px-2 py-1 text-default-600 transition-colors hover:bg-default-100 disabled:opacity-50"
            disabled={isChangeTeamLoading}
            onClick={handleChangeTeam}
          >
            <ArrowsRightLeftIcon className="w-4" />
            <span className="font-bold">팀변경</span>
          </button>
        </div>
        <div className="flex w-full flex-col items-start overflow-y-auto">
          <div>
            <h5 className="px-4 text-lg font-bold">A팀</h5>
          </div>
          {teamA.length === 0 && (
            <p className="w-full px-4 py-2 text-center text-sm text-default-500">
              참가자가 없습니다.
            </p>
          )}
          {teamA.map((participant) => (
            <Participant
              key={participant.participantId}
              img={participant.profileImg}
              isMe={participant.isMine}
              nickname={participant.nickname}
            />
          ))}
          <div className="flex w-full items-center gap-2 px-4">
            <Divider className="flex-1" />
            <span className="text-lg">vs</span>
            <Divider className="flex-1" />
          </div>
          <div>
            <h5 className="px-4 text-lg font-bold">B팀</h5>
          </div>
          {teamB.length === 0 && (
            <p className="w-full px-4 py-2 text-center text-sm text-default-500">
              참가자가 없습니다.
            </p>
          )}
          {teamB.map((participant) => (
            <Participant
              key={participant.participantId}
              {...participant}
              img={participant.profileImg}
            />
          ))}
        </div>
        <div className="mt-auto w-full px-4 py-4">
          <Button
            className="w-full"
            color="danger"
            onClick={openExitConfirmModal}
          >
            챌린지 나가기
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
