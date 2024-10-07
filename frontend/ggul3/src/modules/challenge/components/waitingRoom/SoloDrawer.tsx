import { Button } from '@nextui-org/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';
import { useGetParticipantList } from '../../reactQueries/useChallengeQuery';

import { Participant } from './Participant';

import { Drawer } from '@/modules/common/components/Drawer';

interface SoloDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
}
export const SoloDrawer = ({
  isOpen,
  onClose,
  challengeId,
}: SoloDrawerProps) => {
  const { setIsExitConfirmModalOpen } = useWaitingRoomStore();
  const { data: participantList } = useGetParticipantList(challengeId!);

  const openExitConfirmModal = () => {
    setIsExitConfirmModalOpen(true);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <h5 className="text-lg font-bold">참가자</h5>
          <button onClick={onClose}>
            <XMarkIcon className="h-7 w-7 text-default-800" />
          </button>
        </div>
        <div className="flex w-full flex-col items-start overflow-y-auto">
          {participantList.length === 0 && (
            <p className="w-full px-4 py-2 text-center text-sm text-default-500">
              참가자가 없습니다.
            </p>
          )}
          {participantList.map((participant) => (
            <Participant
              key={participant.participantId}
              img={participant.profileImg}
              isMe={participant.isMine}
              nickname={participant.nickname}
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
