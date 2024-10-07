import { useEffect, useState } from 'react';
import { LuckyDrawDetailDTO } from '@types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';

import { GgulPoint } from '../components';
import { useWalletStore } from '../store/walletStore';
import { LuckyDrawDTO, getLuckyDrawDetail, luckyDraw } from '../apis/luckyDraw';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { toYYMDhm } from '@/modules/common/utils/dateUtils';
import { PathNames } from '@/router';

export const LuckyDrawDetailPage = () => {
  const params = useParams();
  const applicationId = Number(params.id);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { ggulToken, getMyGgulToken } = useWalletStore();
  const [item, setItem] = useState<LuckyDrawDetailDTO | null>(null);

  const [result, setResult] = useState<LuckyDrawDTO | null>(null);

  useEffect(() => {
    const getGgulToken = async () => {
      if (!ggulToken) {
        getMyGgulToken();
      }
    };
    const fetchLuckyDrawDetail = async () => {
      const detail = await getLuckyDrawDetail(applicationId);

      setItem(detail);
    };

    getGgulToken();
    fetchLuckyDrawDetail();
  }, []);

  const handleClickDrawButton = async () => {
    const result = await luckyDraw(applicationId);

    onOpen();
    console.log(result);
    await getMyGgulToken();
    setResult(result);
  };

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="상품 응모 상세" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow />
      </div>
      <PageContainer>
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <Image
              removeWrapper
              alt="Card image background"
              className="z-0 mb-3 h-full w-full object-contain"
              src={item?.imageUrl}
            />
            <p className="mb-1 text-xl font-bold">{item?.title}</p>

            <div className="flex w-full gap-3">
              <div className="flex flex-1 flex-col">
                <p className="rounded-full border p-2 font-bold text-primary">
                  {(item?.probability as number) * 100}%
                </p>
                <p className="font-medium">당첨 확률</p>{' '}
              </div>
              <div className="flex flex-1 flex-col">
                <p className="rounded-full border p-2 font-bold text-primary">
                  {item?.price}P
                </p>
                <p className="font-medium">응모 가격</p>{' '}
              </div>
              <div className="flex flex-1 flex-col">
                <p className="rounded-full border p-2 font-bold text-primary">
                  {item?.maxWinnerCount}
                </p>
                <p className="font-medium">당첨 수량</p>
              </div>
            </div>
            <Button
              className="w-full"
              color={`${item?.status ? 'primary' : 'default'}`}
              onClick={handleClickDrawButton}
            >
              응모하기
            </Button>

            <p className="mb-10 flex flex-col text-sm text-gray-500">
              응모 시작 시간
              <span>{toYYMDhm(item?.createdAt as string)}</span>
            </p>
          </div>
        </div>

        <ResultModal
          drawEvent={handleClickDrawButton}
          isOpen={isOpen}
          result={result}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </PageContainer>
    </>
  );
};

interface ResultModalProps {
  result: LuckyDrawDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  drawEvent: () => void;
}

const ResultModal = ({
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
