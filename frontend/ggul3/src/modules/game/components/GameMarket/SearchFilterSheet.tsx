// frontend/ggul3/src/modules/game/components/GameMarket/SearchFilterSheet.tsx

import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { Input, Button, Slider } from '@nextui-org/react';

interface SearchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchCriteria: {
    name?: string;
    minStatus?: number;
    maxStatus?: number;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

export const SearchFilterSheet = ({
  isOpen,
  onClose,
  onSearch,
}: SearchFilterSheetProps) => {
  // 검색 필드 상태 관리
  const [name, setName] = useState('');
  const [minStatus, setMinStatus] = useState(0);
  const [maxStatus, setMaxStatus] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // 검색 버튼 클릭 시
  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      minStatus,
      maxStatus,
      minPrice,
      maxPrice,
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
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 text-white">맛도리력 범위 (status)</p>
                <Slider
                  defaultValue={[minStatus, maxStatus]}
                  maxValue={100}
                  step={1}
                  onChange={(value) => {
                    // 타입 체크를 통해 안전한 배열 처리
                    if (Array.isArray(value)) {
                      setMinStatus(value[0]);
                      setMaxStatus(value[1]);
                    }
                  }}
                />
                <div className="flex justify-between">
                  <span className="text-white">최소: {minStatus}</span>
                  <span className="text-white">최대: {maxStatus}</span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-white">가격 범위 (ㄲ)</p>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  maxValue={1000}
                  step={10}
                  onChange={(value) => {
                    // 타입 체크를 통해 안전한 배열 처리
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
