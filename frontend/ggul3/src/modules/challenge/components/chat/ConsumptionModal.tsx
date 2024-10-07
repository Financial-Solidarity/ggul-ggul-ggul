import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';

import { useConsumptionModalStore } from '../../store/consumptionModalStore';
import {
  useGetChallengeDetail,
  useGetParticipantList,
} from '../../reactQueries/useChallengeQuery';
import { useGetConsumptionList } from '../../reactQueries/useConsumptionQuery';

export const ConsumptionModal = () => {
  const { isOpen, challengeId, setIsOpen } = useConsumptionModalStore();

  const { data: challengeDetail } = useGetChallengeDetail(challengeId);
  const { data: participantList } = useGetParticipantList(challengeId);
  const { data: consumptionList } = useGetConsumptionList(challengeId);

  return (
    <Modal className="p-0" isOpen={isOpen} size="full" onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-0" />
            <ModalFooter className="p-0" />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
