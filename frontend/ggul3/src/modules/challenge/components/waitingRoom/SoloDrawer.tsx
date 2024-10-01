import { Button } from '@nextui-org/react';

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
        <div className="px-4 py-4">
          <h5 className="text-lg font-bold">참가자</h5>
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
              {...participant}
              img={participant.profileImg}
            />
          ))}
        </div>
        <div className="w-full px-4 py-4">
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
