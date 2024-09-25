import { Button } from '@nextui-org/react';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';

import { Participant } from './Participant';

import { Drawer } from '@/modules/common/components/Drawer';

interface SoloDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SoloDrawer = ({ isOpen, onClose }: SoloDrawerProps) => {
  const { setIsExitConfirmModalOpen } = useWaitingRoomStore();

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
          <Participant isMe nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
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
