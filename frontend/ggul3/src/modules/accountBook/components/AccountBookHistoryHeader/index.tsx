import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Payment } from '@types';

import { getArrayYYMMDD } from '../../utils/getYYMMDD';

interface AccountBookHistoryHeaderProps {
  paymentList: Payment[];
  startDate: string;
  setSearchParams: (params: string) => void;
}

export const AccountBookHistoryHeader = ({
  paymentList,
  startDate,
  setSearchParams,
}: AccountBookHistoryHeaderProps) => {
  console.log(paymentList);
  const totalPayment = paymentList.reduce(
    (acc, payment) => acc + payment.money,
    0,
  );

  const spendGgul = paymentList.reduce(
    (acc, payment) => acc + payment.spendGgulToken!,
    0,
  );

  console.log(spendGgul);

  const { currentYear, currentMonth, transformedYears, transformedMonths } =
    getArrayYYMMDD();

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
          <p className="text-2xl font-bold">{totalPayment}원</p>
        </div>
        <div className="flex-1">
          <p className="flex text-sm">껄 페이로 절약한 비용</p>
          <p className="text-2xl font-bold">+{spendGgul}원</p>
        </div>
      </div>
    </div>
  );
};
