import { Slider } from '@nextui-org/react';

import { buyItem } from '../../apis/qrScanner';

interface SlideBarProps {
  slideValue: number;
  spendGgulToken: string;
  itemInfo: {
    categoryId: number;
    productName: string;
    requiredMoney: number;
    market: string;
  };
  setSlideValue: (slideValue: number | number[]) => void;
}

export const PaymentSlideBar = ({
  slideValue,
  spendGgulToken,
  setSlideValue,
  itemInfo,
}: SlideBarProps) => {
  const { categoryId, productName, requiredMoney, market } = itemInfo;

  const handleSlideEnd = async () => {
    if (slideValue < 100) {
      // 1씩 빠르게 0까지 감소시키려면
      const interval = setInterval(() => {
        // @ts-ignore
        setSlideValue((prev) => (prev >= 10 ? prev - 10 : 0));
      }, 30);

      setTimeout(() => {
        clearInterval(interval);
      }, 300);
    } else {
      console.log({
        categoryId,
        spendGgulToken,
        requiredMoney,
        productName,
        market,
      });

      const response = await buyItem({
        categoryId,
        spendGgulToken: 0,
        requiredMoney,
        productName,
        market,
      });

      console.log(response);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-start justify-center gap-2">
      <div className="relative w-full">
        <Slider
          aria-label="Volume"
          className="h-full"
          color="primary"
          size="lg"
          value={slideValue}
          onChange={setSlideValue}
          onChangeEnd={handleSlideEnd}
        />
        <div className="absolute left-[8%] top-0 h-full w-full bg-red-200/0 text-[0]">
          차단막
        </div>
      </div>
    </div>
  );
};
