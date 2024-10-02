import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface AccountBookHistoryHeaderProps {
  startDate: string;
  setSearchParams: (params: string) => void;
}

export const AccountBookHistoryHeader = ({
  startDate,
  setSearchParams,
}: AccountBookHistoryHeaderProps) => {
  const years = Array.from({ length: 125 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    (12 - i).toString().padStart(2, '0'),
  );
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const transformedYears = years.map((year) => ({
    value: year.toString() + '년',
    label: year.toString() + '년',
  }));
  const transformedMonths = months.map((month) => ({
    value: month.toString() + '월',
    label: month.toString() + '월',
  }));

  const [year, month] = startDate.split('-');

  return (
    <div
      className={`flex flex-col bg-primary p-4 text-white transition-all duration-200`}
    >
      <div className="mb-6 flex gap-2">
        <div className="w-20">
          <Autocomplete
            aria-label="년도 선택"
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
            onInputChange={(value) => {
              const params = new URLSearchParams({
                'start-date': `${value.slice(0, 4)}-${month.toString().padStart(2, '0')}`,
                'end-date': `${value.slice(0, 4)}-${month.toString().padStart(2, '0')}`,
                page: '0',
              });

              setSearchParams(params.toString());
            }}
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
            aria-label="월 선택"
            classNames={{
              selectorButton: 'hidden',
            }}
            // @ts-ignore
            color="white"
            defaultItems={transformedMonths}
            defaultSelectedKey={currentMonth.toString().padStart(2, '0') + '월'}
            isClearable={false}
            size="lg"
            variant="underlined"
            onInputChange={(value) => {
              const params = new URLSearchParams({
                'start-date': `${year.toString().slice(0, 4)}-${value.slice(0, 2)}`,
                'end-date': `${year.toString().slice(0, 4)}-${value.slice(0, 2)}`,
                page: '0',
              });

              setSearchParams(params.toString());
            }}
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
