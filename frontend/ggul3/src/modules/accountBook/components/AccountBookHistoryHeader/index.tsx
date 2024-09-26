import { useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const years = Array.from({ length: 125 }, (_, i) => 2024 - i);
const months = Array.from({ length: 12 }, (_, i) => 12 - i);
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

// years의 내용을 {key: number, value: number} 형태로 변환해
const transformedYears = years.map((year) => ({
  value: year.toString() + '년',
  label: year.toString() + '년',
}));
const transformedMonths = months.map((month) => ({
  value: month.toString() + '월',
  label: month.toString() + '월',
}));

export const AccountBookHistoryHeader = () => {
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(9);

  return (
    <div
      className={`flex flex-col bg-primary p-4 text-white transition-all duration-200`}
    >
      <div className="mb-6 flex gap-2">
        <div className="w-20">
          <Autocomplete
            aria-label="년도 선택" // 추가된 부분
            classNames={{
              selectorButton: 'hidden',
            }}
            // @ts-ignore
            color="white"
            defaultItems={transformedYears}
            defaultSelectedKey={currentYear.toString() + '년'}
            isClearable={false}
            size="lg"
            variant="underlined"
            onInputChange={(value) => setYear(Number(value))}
          >
            {transformedYears.map((year) => (
              <AutocompleteItem
                key={year.value}
                textValue={year.label}
                value={year.value}
              >
                {year.label.slice(0, 4)}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="w-14">
          <Autocomplete
            aria-label="월 선택" // 추가된 부분
            classNames={{
              selectorButton: 'hidden',
            }}
            // @ts-ignore
            color="white"
            defaultItems={transformedMonths}
            defaultSelectedKey={currentMonth.toString() + '월'}
            isClearable={false}
            size="lg"
            variant="underlined"
            onInputChange={(value) => setMonth(Number(value))}
          >
            {transformedMonths.map((month) => (
              <AutocompleteItem
                key={month.value}
                textValue={month.label}
                value={month.value}
              >
                {month.label.split('월')[0]}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1">
          <p className="flex text-sm">이용 내역</p>
          <p className="text-2xl font-bold">-236,680원</p>
        </div>
        <div className="flex-1">
          <p className="flex text-sm">껄 페이로 절약한 비용</p>
          <p className="text-2xl font-bold">+8,310원</p>
        </div>
      </div>
    </div>
  );
};
