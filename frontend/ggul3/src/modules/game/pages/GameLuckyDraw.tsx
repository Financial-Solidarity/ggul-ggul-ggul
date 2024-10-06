import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { toast } from 'react-hot-toast';

import {
  useGameLuckyDrawState,
  useLuckyDrawActions,
} from '../hooks/useLuckyDraw';
import { ContentSection } from '../components/GameLuckyDraw/ContentSection';
import { ActionButtons } from '../components/GameLuckyDraw/ActionButtons';
import { MiniTokenBalanceChip } from '../components/common/MiniTokenBalanceChip';

import { useLuckyDrawStore } from '@/modules/game/store/useLuckyDrawStore';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const GameLuckyDraw = (): JSX.Element => {
  useSetBottomBar({ active: false });
  const navigate = useNavigate();

  const { equipment, setEquipment, nft, setNft, reset } =
    useGameLuckyDrawState();
  const { step, startDrawing, stopDrawing, startMinting, stopMinting } =
    useLuckyDrawStore();
  const { onClickLuckyDrawButton, onClickMintButton } = useLuckyDrawActions({
    setEquipment,
    setNft,
    startDrawing,
    stopDrawing,
    startMinting,
    stopMinting,
  });

  const { initStep } = useLuckyDrawStore();

  // 에러 핸들링을 위한 state 추가
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // 민팅과 뽑기 모두 에러 시 호출되는 핸들러
  const handleError = (errorMessage: string) => {
    toast.error(errorMessage);
    setIsErrorModalOpen(true); // 모달을 열어줌
  };

  // 모달에서 돌아가기 버튼 클릭 시 페이지 새로고침
  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    return () => {
      reset();
      initStep();
    };
  }, []);

  return (
    <>
      <TopBar
        bgColor="bg-black"
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <PageContainer
        bgColor="bg-black"
        titleContent={
          <div className="flex w-full flex-row justify-between">
            <p className="text-2xl font-semibold text-white">껄 음식 뽑기</p>
            {<MiniTokenBalanceChip />}
          </div>
        }
      >
        <ContentSection
          equipment={equipment}
          navigate={navigate}
          nft={nft}
          step={step}
        />
        <ActionButtons
          equipment={equipment}
          step={step}
          onClickLuckyDrawButton={() => {
            onClickLuckyDrawButton().catch(() =>
              handleError('음식 뽑기에 실패했습니다.'),
            );
          }}
          onClickMintButton={(equipment) => {
            onClickMintButton(equipment).catch(() =>
              handleError('조리에 실패했습니다.'),
            );
          }}
        />
      </PageContainer>

      {/* 에러 모달 */}
      {isErrorModalOpen && (
        <Modal closeButton isOpen={isErrorModalOpen} onClose={handleReload}>
          <ModalContent>
            <ModalHeader>오류 발생</ModalHeader>
            <ModalBody>
              <p>작업 중 오류가 발생했습니다. 다시 시도해주세요.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleReload}>
                돌아가기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
