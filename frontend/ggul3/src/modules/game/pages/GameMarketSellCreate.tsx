import { Input, Slider, Button } from '@nextui-org/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EquipmentNftInfoRow } from '../components/common/EquipmentNftInfoRow';
import { SuccessLottie } from '../components/common/Lotties/SuccessLottie';
import { FailLottie } from '../components/common/Lotties/FailLottie';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { EquipmentNFTDTO, RegisterSellNFTRequest } from '@/modules/game/@types';
import { useRegisterSellNFTMutation } from '@/modules/game/queries';

export const GameMarketSellCreate = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const navigate = useNavigate();
  const location = useLocation();
  const { nftInfo } = location.state || {};

  const equipmentNft: EquipmentNFTDTO = nftInfo;

  const [price, setPrice] = useState(100);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: registerSellNFT, status } = useRegisterSellNFTMutation();

  const isLoading = status === 'pending';

  const handleRegisterSell = () => {
    const sellNftData: RegisterSellNFTRequest = {
      ipfsCID: equipmentNft.ipfsCID,
      title,
      description,
      price,
    };

    registerSellNFT(sellNftData, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error) => {
        // setErrorMessage(error || '알 수 없는 오류 발생');
      },
    });
  };

  const handleGoBack = () => {
    navigate(-2);
  };

  const handleGoToMarket = () => {
    navigate('/game/market');
  };

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
            <p className="text-2xl font-semibold text-white">판매글 등록</p>
          </div>
        }
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center">
            <SuccessLottie />
            <p className="mt-4 text-2xl font-semibold text-white">
              판매글을 올렸어요!
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                className="bg-purple-600 text-white"
                onPress={handleGoToMarket}
              >
                마켓 보러가기
              </Button>
              <Button className="bg-gray-600 text-white" onPress={handleGoBack}>
                돌아가기
              </Button>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="flex flex-col items-center justify-center">
            <FailLottie />
            <p className="mt-4 text-2xl font-semibold text-red-500">
              판매 실패: {errorMessage}
            </p>
            <Button
              className="mt-8 bg-gray-600 text-white"
              onClick={handleGoBack}
            >
              돌아가기
            </Button>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between pb-4">
            <div className="text-default-400">
              음식 판매를 위한 정보를 입력해주세요.
            </div>
            <div className="INPUT-FORM flex flex-col gap-6">
              {equipmentNft && (
                <div className="my-8">
                  <EquipmentNftInfoRow equipmentNft={equipmentNft} />
                </div>
              )}
              <div className="">
                <p className="mb-2 text-purple-400">판매글 제목</p>
                <Input
                  fullWidth
                  placeholder="무언가 입력해주세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="">
                <p className="mb-2 text-purple-400">판매글 설명</p>
                <Input
                  fullWidth
                  placeholder="무언가를 입력해주세요."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <p className="mb-2 text-purple-400">판매 가격 설정</p>
                <Slider
                  color="primary"
                  maxValue={10000}
                  minValue={100}
                  step={100}
                  value={price}
                  onChange={(value) => setPrice(value as number)}
                />
                <div className="mt-2 text-center text-white">{price} 껄</div>
              </div>
            </div>
            <Button
              className="mt-4 w-full rounded-lg bg-purple-600 py-3 text-white"
              disabled={isLoading}
              onClick={handleRegisterSell}
            >
              {isLoading ? '등록 중' : '음식 판매글 등록하기'}
            </Button>
          </div>
        )}
      </PageContainer>
    </>
  );
};
