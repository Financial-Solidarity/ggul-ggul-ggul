import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

import { LuckyDrawDTO } from '../../apis/luckyDraw';

import { PathNames } from '@/router';

interface ResultModalProps {
  result: LuckyDrawDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  drawEvent: () => void;
}

export const ResultModal = ({
  result,
  isOpen,
  onClose,
  onOpenChange,
  drawEvent,
}: ResultModalProps) => {
  const navigate = useNavigate();

  const handleClickRetry = () => {
    onClose();
    onOpenChange();
    drawEvent();
  };

  const handleClickViewHistory = () => {
    onClose();
    navigate(PathNames.GGULPAY.PRIZE_HISTORY.path);
  };

  return (
    <Modal
      hideCloseButton
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {result?.isSuccess ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-xl font-bold">당첨 되었습니다!</p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-col gap-3">
                    <p>남은 당첨자 수: {result.remainingWinnerCount}명</p>
                    <Button
                      className="w-full"
                      color="primary"
                      onClick={handleClickViewHistory}
                    >
                      응모 내역 보러가기
                    </Button>
                    <Link to={result.transactionUrl}>
                      <Button className="w-full" color="default">
                        블록체인 기록 보러가기
                      </Button>
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {result && (
                    <p className="text-xl font-bold">
                      아쉽게도 당첨되지 않았습니다.
                    </p>
                  )}
                </ModalHeader>
                <ModalBody>
                  {result && (
                    <div className="flex w-full flex-col gap-3">
                      <p>남은 당첨자 수: {result.remainingWinnerCount}명</p>
                      <Button
                        className="w-full"
                        color="primary"
                        onClick={handleClickRetry}
                      >
                        다시 응모하기
                      </Button>
                      <div className="flex gap-3">
                        <Link to={result.transactionUrl}>
                          <Button className="w-full" color="default">
                            블록체인 기록 보러가기
                          </Button>
                        </Link>
                        <Button
                          className="w-full"
                          color="default"
                          onClick={onClose}
                        >
                          그만 할래요.
                        </Button>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
