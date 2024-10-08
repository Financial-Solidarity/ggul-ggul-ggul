import { Slider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { buyItem } from '../../apis/qrScanner';

import { PathNames } from '@/router';

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
  const navigate = useNavigate();

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
      try {
        await buyItem({
          categoryId,
          spendGgulToken: Number(spendGgulToken),
          requiredMoney,
          productName,
          market,
        });

        navigate(
          {
            pathname: PathNames.ACCOUNT_BOOK.PAYMENT_SUCCESS.path,
            search: `?product-name=${productName}&market=${market}`,
          },
          {
            replace: true,
          },
        );
      } catch (e) {
        // @ts-ignore
        window.alert(e.message);
        setSlideValue(0);
      }
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
