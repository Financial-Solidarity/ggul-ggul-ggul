import React, { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { Button, Tabs, Tab, Slider } from '@nextui-org/react';

import { useEquipmentNamesQuery } from '../../queries';
import { MarketStatus } from '../../@types';

export type FilterableMarketStatus = Exclude<MarketStatus, 'CANCELED'>;

interface SearchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchCriteria: {
    name?: string;
    minPower?: number;
    maxPower?: number;
    minPrice?: number;
    maxPrice?: number;
    own?: 'true' | 'false';
    status?: FilterableMarketStatus;
  }) => void;
  isMyPost: boolean;
}

export const SearchFilterSheet = ({
  isOpen,
  onClose,
  onSearch,
  isMyPost,
}: SearchFilterSheetProps) => {
  const { data: equipmentNames = [] } = useEquipmentNamesQuery();
  const [selectedName, setSelectedName] = useState<string | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [grade, setGrade] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [marketStatus, setMarketStatus] =
    useState<FilterableMarketStatus>('PENDING');

  const gradePowerRanges = [
    { min: 0, max: 999 },
    { min: 801, max: 999 },
    { min: 601, max: 800 },
    { min: 401, max: 600 },
    { min: 201, max: 400 },
    { min: 1, max: 200 },
  ];

  const handleSearch = () => {
    const selectedGrade = gradePowerRanges[grade];
    const minPower = grade === 0 ? undefined : selectedGrade.min;
    const maxPower = grade === 0 ? undefined : selectedGrade.max;

    onSearch({
      name: selectedName || undefined,
      minPower,
      maxPower,
      minPrice,
      maxPrice,
      own: isMyPost ? 'true' : 'false',
      status: isMyPost ? marketStatus : 'PENDING',
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
          <div className="flex flex-col justify-between space-y-4 px-4 pb-12">
            {/* 음식 선택 */}
            <div className="relative">
              <p className="mb-2 text-sm font-semibold text-primary-300">
                음식 선택
              </p>
              <Button
                fullWidth
                className="bg-white capitalize text-black"
                variant="bordered"
                onPress={() => setIsDropdownOpen((prev) => !prev)}
              >
                {selectedName || '전체'}
              </Button>
              {isDropdownOpen && (
                <div className="absolute z-50 mt-1 max-h-60 w-full animate-fadeIn overflow-y-auto rounded-md bg-white shadow-lg">
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => {
                      setSelectedName(undefined);
                      setIsDropdownOpen(false);
                    }}
                  >
                    전체
                  </div>
                  {equipmentNames.map((name) => (
                    <div
                      key={name}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => {
                        setSelectedName(name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 등급 선택 탭 */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-primary-300">
                등급 선택
              </p>
              <Tabs
                fullWidth
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

            {/* 내 판매글 탭일 경우에만 상태 필터링 탭 렌더링 */}
            {isMyPost && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-primary-300">
                  판매 상태
                </p>
                <Tabs
                  fullWidth
                  aria-label="Market Status Filter"
                  className="flex w-full overflow-x-auto whitespace-nowrap"
                  selectedKey={marketStatus}
                  onSelectionChange={(key) =>
                    setMarketStatus(key as FilterableMarketStatus)
                  }
                >
                  <Tab key="PENDING" title="판매중" />
                  <Tab key="COMPLETED" title="판매 완료" />
                </Tabs>
              </div>
            )}

            {/* 가격 범위 설정 */}
            <div>
              <p className="mb-2 text-sm font-semibold text-primary-300">
                가격 범위
              </p>
              <Slider
                defaultValue={[minPrice, maxPrice]}
                maxValue={10000}
                step={100}
                onChange={(value) => {
                  if (Array.isArray(value)) {
                    setMinPrice(value[0]);
                    setMaxPrice(value[1]);
                  }
                }}
              />
              <div className="flex justify-between px-2">
                <span className="text-sm text-primary-100">{minPrice}</span>
                <span className="text-sm text-primary-100">{maxPrice}</span>
              </div>
            </div>
            <Button
              fullWidth
              className="bg-primary-500 font-semibold text-white"
              onClick={handleSearch}
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
