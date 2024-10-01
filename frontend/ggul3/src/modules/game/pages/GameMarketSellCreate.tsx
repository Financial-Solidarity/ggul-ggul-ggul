import { Input, Slider } from '@nextui-org/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FoodNftInfoRow } from '../components/common/FoodNftInfoRow';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

export const GameMarketSellCreate = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  const location = useLocation();
  const { nftInfo } = location.state || {};

  // Assume nftInfo is of type EquipmentNFTDTO
  const equipmentNft: EquipmentNFTDTO = nftInfo;

  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState(''); // Title for SaleDTO
  const [description, setDescription] = useState(''); // Description for SaleDTO

  const handleRegisterSell = () => {
    // 판매 등록을 위한 DTO 생성
    const saleData = {
      title,
      description,
      price,
    };

    // `SellNFTDTO` 생성 (실제로 API 호출 시 사용할 형태)
    const sellNftData = {
      ipfsCID: equipmentNft.ipfsCID,
      nftUrl: equipmentNft.nftUrl,
      equipment: equipmentNft.equipment,
      sale: saleData,
    };

    // API 호출을 위한 함수 (추후 구현 필요)
    // registerSellNFT(sellNftData);
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
        {/* 설명 텍스트 */}
        <div className="flex h-full flex-col justify-between pb-4">
          <div className="text-default-400">
            음식 판매를 위한 정보를 입력해주세요.
          </div>
          <div className="INPUT-FORM flex flex-col gap-6">
            {/* NFT 정보 표시 */}
            {equipmentNft && (
              <div className="my-8">
                <FoodNftInfoRow equipmentNft={equipmentNft} />
              </div>
            )}

            {/* 판매글 제목 입력 */}
            <div className="">
              <p className="mb-2 text-purple-400">판매글 제목</p>
              <Input
                fullWidth
                placeholder="무언가 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 판매글 설명 입력 */}
            <div className="">
              <p className="mb-2 text-purple-400">판매글 설명</p>
              <Input
                fullWidth
                placeholder="무언가를 입력해주세요."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* 판매 가격 설정 */}
            <div className="mb-6">
              <p className="mb-2 text-purple-400">판매 가격 설정</p>
              <Slider
                color="primary"
                maxValue={1000}
                minValue={0}
                step={50}
                value={price}
                onChange={(value) => setPrice(value as number)}
              />
              <div className="mt-2 text-center text-white">{price} 껄</div>
            </div>
          </div>
          {/* 등록 버튼 */}
          <button
            className="mt-4 w-full rounded-lg bg-purple-600 py-3 text-white"
            onClick={handleRegisterSell}
          >
            NFT 음식 판매 등록하기
          </button>
        </div>
      </PageContainer>
    </>
  );
};
