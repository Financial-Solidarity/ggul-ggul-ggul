import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

import { LuckyDrawDTO } from '../../apis/luckyDraw';

import { PathNames } from '@/router';

interface ResultModalProps {
  chance: number;
  result: LuckyDrawDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  drawEvent: () => void;
}

export const ResultModal = ({
  chance,
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
      <ModalContent className="pb-20 pt-2">
        {(onClose) => (
          <>
            {result?.isSuccess ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-xl font-bold">당첨 되었습니다!</p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-col gap-1">
                    <PrizeInfo chance={chance} result={result} />
                    <Button
                      className="w-full"
                      color="primary"
                      onClick={handleClickViewHistory}
                    >
                      응모 내역 보러가기
                    </Button>
                    <Link target="_blank" to={result.transactionUrl}>
                      <Button className="w-full" color="default">
                        블록체인 기록 보기
                      </Button>
                    </Link>
                  </div>
                </ModalBody>
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
                      <PrizeInfo chance={chance} result={result} />
                      <Button
                        className="w-full"
                        color="primary"
                        onClick={handleClickRetry}
                      >
                        다시 응모하기
                      </Button>
                      <div className="flex w-full gap-2">
                        <Link
                          className="flex-1"
                          target="_blank"
                          to={result.transactionUrl}
                        >
                          <Button className="w-full" color="default">
                            블록체인 기록 보기
                          </Button>
                        </Link>
                        <div className="flex-1">
                          <Button
                            className="w-full"
                            color="default"
                            onClick={onClose}
                          >
                            그만 할래요.
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const PrizeInfo = ({
  result,
  chance,
}: {
  result: LuckyDrawDTO | null;
  chance: number;
}) => {
  return (
    <>
      <div className="text-sm text-gray-500">
        <p className="mb-1">
          <span className="font-bold text-primary">{result?.target + ' '}</span>
          보다 낮은 숫자가 나왔을 경우 당첨입니다.{' '}
        </p>
        <p className="leading-4">
          숫자 범위 : 0 ~{' '}
          {chance === 1 ? 0 : 10 ** chance.toString().split('.')[1].length - 1}
        </p>
        <p className="leading-4">
          내가 뽑은 숫자 :{' '}
          <span className="font-bold text-primary">{result?.nonce}</span>
        </p>
      </div>
      <p>남은 당첨자 수: {result?.remainingWinnerCount}명</p>
    </>
  );
};
