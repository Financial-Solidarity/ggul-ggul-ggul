import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { Input, Button, Tabs, Tab, Slider } from '@nextui-org/react';

import { MarketStatus } from '../../@types';

interface SearchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchCriteria: {
    name?: string;
    minPower?: number;
    maxPower?: number;
    minPrice?: number;
    maxPrice?: number;
    own?: 'x' | 'true' | 'false';
    status: MarketStatus;
  }) => void;
}

export const SearchFilterSheet = ({
  isOpen,
  onClose,
  onSearch,
}: SearchFilterSheetProps) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // grade에 따른 power 범위 설정
  const gradePowerRanges = [
    { min: 0, max: 999 }, // 전체
    { min: 1, max: 200 }, // 0등급
    { min: 201, max: 400 }, // 1등급
    { min: 401, max: 600 }, // 2등급
    { min: 601, max: 800 }, // 3등급
    { min: 801, max: 999 }, // 4등급
  ];

  const handleSearch = () => {
    const selectedGrade = gradePowerRanges[grade];
    const minPower = grade === 0 ? undefined : selectedGrade.min;
    const maxPower = grade === 0 ? undefined : selectedGrade.max;

    onSearch({
      name: name || undefined,
      minPower,
      maxPower,
      minPrice,
      maxPrice,
      own: 'x',
      status: 'PENDING',
    });
    onClose();
  };

  return (
    <Sheet
      detent="content-height"
      initialSnap={0}
      isOpen={isOpen}
      snapPoints={[0.9, 0.4]}
      onClose={onClose}
    >
      <Sheet.Container className="!bg-default-900 px-4">
        <Sheet.Header />
        <Sheet.Content className="mb-8 mt-12">
          <div className="space-y-4 px-4 pb-12">
            <Input
              fullWidth
              className="bg-gray-800 text-white"
              placeholder="이름으로 검색"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* 등급 선택 탭 */}
            <div className="mt-4">
              <p className="mb-2 text-white">등급 선택 (Grade)</p>
              <Tabs
                aria-label="NFT Grade Filter"
                className="flex w-full overflow-x-auto whitespace-nowrap"
                selectedKey={String(grade)}
                onSelectionChange={(key) => setGrade(Number(key))}
              >
                <Tab key="0" title="전체" />
                <Tab key="1" title="매우 희귀" />
                <Tab key="2" title="희귀" />
                <Tab key="3" title="보통" />
                <Tab key="4" title="흔함" />
                <Tab key="5" title="매우 흔함" />
              </Tabs>
            </div>

            {/* 가격 범위 설정 */}
            <div>
              <p className="mb-2 text-white">가격 범위 (ㄲ)</p>
              <Slider
                defaultValue={[minPrice, maxPrice]}
                maxValue={1000}
                step={50}
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setMinPrice(value[0]);
                    setMaxPrice(value[1]);
                  }
                }}
              />
              <div className="flex justify-between">
                <span className="text-white">최소: ㄲ {minPrice}</span>
                <span className="text-white">최대: ㄲ {maxPrice}</span>
              </div>
            </div>

            <Button
              fullWidth
              className="mt-4 bg-purple-600"
              onPress={handleSearch}
            >
              검색하기
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
