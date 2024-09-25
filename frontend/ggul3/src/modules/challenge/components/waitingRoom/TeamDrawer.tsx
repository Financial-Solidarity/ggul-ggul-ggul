import { Button, Divider } from '@nextui-org/react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';

import { Participant } from './Participant';

import { Drawer } from '@/modules/common/components/Drawer';

interface TeamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const TeamDrawer = ({ isOpen, onClose }: TeamDrawerProps) => {
  const { setIsExitConfirmModalOpen } = useWaitingRoomStore();

  const openExitConfirmModal = () => {
    setIsExitConfirmModalOpen(true);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <h5 className="text-lg font-bold">참가자</h5>
          <div className="flex items-center gap-1 text-default-600">
            <ArrowsRightLeftIcon className="w-4" />
            <span className="font-bold">팀변경</span>
          </div>
        </div>
        <div className="flex w-full flex-col items-start overflow-y-auto">
          <div>
            <h5 className="px-4 text-lg font-bold">A팀</h5>
          </div>
          <Participant isMe nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <Participant nickname="조성우" />
          <div className="flex w-full items-center gap-2 px-4">
            <Divider className="flex-1" />
            <span className="text-lg">vs</span>
            <Divider className="flex-1" />
          </div>
          <div>
            <h5 className="px-4 text-lg font-bold">B팀</h5>
          </div>
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
