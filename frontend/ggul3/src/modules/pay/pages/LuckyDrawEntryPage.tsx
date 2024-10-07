import { Button } from '@nextui-org/button';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { useEffect } from 'react';
import { LuckyDrawItemDTO } from '@types';
import { useNavigate } from 'react-router-dom';

import { GgulPoint } from '../components';
import { getLuckyDrawList } from '../apis/luckyDraw';
import { useLuckyDrawStore } from '../store/luckyDrawStore';
import { useWalletStore } from '../store/walletStore';

import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

export const LuckyDrawEntryPage = () => {
  const navigate = useNavigate();

  const { luckDrawList, setLuckDrawList } = useLuckyDrawStore();
  const { ggulToken, getMyGgulToken } = useWalletStore();

  useEffect(() => {
    const getGgulToken = async () => {
      if (!ggulToken) {
        await getMyGgulToken();
      }
    };

    const fetchLuckyDrawList = async () => {
      const response = await getLuckyDrawList();

      console.log(response);

      setLuckDrawList(response.content);
    };

    fetchLuckyDrawList();
    getGgulToken();
  }, []);

  const handleClickDrawButton = (id: number) => {
    navigate(`/pay/lucky-draw/${id}`);
  };

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="상품 응모" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow />
      </div>
      <PageContainer>
        <div className="mb-12 pt-5">
          <div>
            <p className="mb-1 text-xl font-bold">추첨 상품</p>
            <div className="flex flex-col gap-3">
              {luckDrawList.map((item) => (
                <LuckyDrawItem
                  key={item.id}
                  luckyDrawItem={item}
                  onClickEvent={handleClickDrawButton}
                />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

interface LuckyDrawItemProps {
  luckyDrawItem: LuckyDrawItemDTO;
  onClickEvent: (id: number) => void;
}

const LuckyDrawItem = ({ luckyDrawItem, onClickEvent }: LuckyDrawItemProps) => {
  return (
    <Card className="col-span-12 h-[240px] w-full sm:col-span-5">
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="text-tiny font-bold uppercase text-white/60">New</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card image background"
        className="z-0 h-full w-full scale-125 object-contain"
        src={luckyDrawItem.imageUrl}
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-zinc-100/50 bg-white/65 duration-200 hover:bg-white/85">
        <div>
          <p className="text-balck text-lg font-bold leading-6">
            {luckyDrawItem.title}
          </p>
          <p className="text-lg font-bold leading-6 text-primary">
            {luckyDrawItem.price} <span>P</span>
          </p>
        </div>
        <Button
          color="primary"
          size="md"
          onClick={() => onClickEvent(luckyDrawItem.id)}
        >
          응모하기
        </Button>
      </CardFooter>
    </Card>
  );
};

const tempLuckDrawList = [
  {
    id: 3,
    title: '신라면 5봉',
    imageUrl:
      'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/application%2F01925e74-2aea-7e43-bace-7d56049a515cpng',
    probability: 0.5,
    price: 500,
    status: 'OPEN',
    createdAt: '2024-10-06T05:52:05',
  },
  {
    id: 2,
    title: '야구르트 10세트',
    imageUrl:
      'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/application%2F01925e73-bb14-7965-8165-b3b8dc3e035dpng',
    probability: 0.75,
    price: 1000,
    status: 'OPEN',
    createdAt: '2024-10-06T05:51:37',
  },
  {
    id: 1,
    title: '건담',
    imageUrl:
      'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/application%2F01925e73-bb14-7965-8165-b3b8dc3e035dpng',
    probability: 0.01,
    price: 5000,
    status: 'CLOSE',
    createdAt: '2024-10-06T05:51:37',
  },
];
