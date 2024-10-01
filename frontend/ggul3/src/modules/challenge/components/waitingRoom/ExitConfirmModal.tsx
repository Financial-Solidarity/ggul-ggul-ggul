import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { useWaitingRoomStore } from '../../store/waitingRoomStore';
import { useExitChallenge } from '../../reactQueries/useChallengeQuery';

import { PathNames } from '@/router';

interface ExitConfirmModalProps {
  challengeId: string;
}
export const ExitConfirmModal = ({ challengeId }: ExitConfirmModalProps) => {
  const { isExitConfirmModalOpen, setIsExitConfirmModalOpen } =
    useWaitingRoomStore();

  const { mutateAsync: exitChallenge, isPending } = useExitChallenge();

  const navigate = useNavigate();

  const toChallengeList = () => {
    navigate(PathNames.CHALLENGE.MAIN.path);
  };

  const exit = (callback: () => void) => {
    exitChallenge(challengeId)
      .then(() => {
        callback(); // close modal
        toChallengeList(); // 챌린지목록 페이지로 이동
        //
      })
      .catch(() => {
        callback(); // close modal
      });
  };

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
              <Button
                color="danger"
                isDisabled={isPending}
                onPress={() => exit(onClose)}
              >
                나가기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
