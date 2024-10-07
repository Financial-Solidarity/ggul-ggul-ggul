import { Input, Slider, Button } from '@nextui-org/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { EquipmentNftInfoRow } from '../components/common/EquipmentNftInfoRow';
import { SuccessLottie } from '../components/common/Lotties/SuccessLottie';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
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
  const [formErrors, setFormErrors] = useState({
    price: '',
    title: '',
    description: '',
    nft: '',
  });

  const { mutate: registerSellNFT, status } = useRegisterSellNFTMutation();

  const isLoading = status === 'pending';

  // 유효성 검사 함수
  const validateForm = () => {
    let errors = {
      price: '',
      title: '',
      description: '',
      nft: '',
    };
    let isValid = true;

    if (!equipmentNft?.ipfsCID) {
      errors.nft = '유효한 NFT가 아닙니다.';
      isValid = false;
    }
    if (!title.trim()) {
      errors.title = '판매글 제목을 입력해주세요.';
      isValid = false;
    }
    if (!description.trim()) {
      errors.description = '판매글 설명을 입력해주세요.';
      isValid = false;
    }
    if (price < 100 || price > 10000) {
      errors.price = '가격은 100~10000 사이의 값이어야 합니다.';
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleRegisterSell = () => {
    if (!validateForm()) {
      toast.error('입력 정보를 확인해주세요.');

      return;
    }

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
        toast.error('판매 등록에 실패하였습니다.');
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
      <TopBar bgColor="bg-black" left={<BackButton />} />
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
        ) : (
          <div className="flex h-full flex-col justify-between pb-4">
            <div className="text-default-400">
              음식 판매를 위한 정보를 입력해주세요.
            </div>
            <div className="INPUT-FORM flex flex-col gap-6">
              {equipmentNft && (
                <div className="my-8">
                  <EquipmentNftInfoRow equipmentNft={equipmentNft} />
                  {formErrors.nft && (
                    <p className="text-sm text-danger-400">{formErrors.nft}</p>
                  )}
                </div>
              )}
              <div className="">
                <p className="mb-2 text-purple-400">판매글 제목</p>
                <Input
                  fullWidth
                  placeholder="무언가 입력해주세요."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (formErrors.title)
                      setFormErrors({ ...formErrors, title: '' });
                  }}
                />
                {formErrors.title && (
                  <p className="ml-1 mt-1 text-sm text-danger-400">
                    {formErrors.title}
                  </p>
                )}
              </div>
              <div className="">
                <p className="mb-2 text-purple-400">판매글 설명</p>
                <Input
                  fullWidth
                  placeholder="무언가를 입력해주세요."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (formErrors.description)
                      setFormErrors({ ...formErrors, description: '' });
                  }}
                />
                {formErrors.description && (
                  <p className="ml-1 mt-1 text-sm text-danger-400">
                    {formErrors.description}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <p className="mb-2 text-purple-400">판매 가격 설정</p>
                <Slider
                  color="primary"
                  maxValue={10000}
                  minValue={100}
                  step={100}
                  value={price}
                  onChange={(value) => {
                    setPrice(value as number);
                    if (formErrors.price)
                      setFormErrors({ ...formErrors, price: '' });
                  }}
                />
                <div className="mt-2 text-center text-white">{price} 껄</div>
                {formErrors.price && (
                  <p className="ml-1 text-sm text-danger-400">
                    {formErrors.price}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="mt-4 h-12 w-full rounded-xl bg-primary-600 py-3 font-bold text-white"
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
