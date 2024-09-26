import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';

export const ExitConfirmModal = () => {
  const { isExitConfirmModalOpen, setIsExitConfirmModalOpen } =
    useWaitingRoomStore();

  return (
    <Modal
      isOpen={isExitConfirmModalOpen}
      onOpenChange={setIsExitConfirmModalOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              챌린지 나가기
            </ModalHeader>
            <ModalBody>
              <p>정말 나가시겠습니까?</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                취소
              </Button>
              <Button color="danger" onPress={onClose}>
                나가기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
