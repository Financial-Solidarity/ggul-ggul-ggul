import { Button } from '@nextui-org/button';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { useEffect } from 'react';
import { LuckyDrawItemDTO } from '@types';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import { GgulPoint } from '../components';
import { getLuckyDrawList } from '../apis/luckyDraw';
import { useLuckyDrawStore } from '../store/luckyDrawStore';
import { useWalletStore } from '../store/walletStore';

import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import no_items from '@/assets/lotties/no_items.json';
import { PathNames } from '@/router';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const LuckyDrawEntryPage = () => {
  const { setActive } = useBottomBarStore();

  const navigate = useNavigate();

  const { luckDrawList, setLuckDrawList } = useLuckyDrawStore();
  const { getMyGgulToken } = useWalletStore();

  useEffect(() => {
    setActive(true);

    const fetchLuckyDrawList = async () => {
      const response = await getLuckyDrawList();

      setLuckDrawList(response.content);
    };

    fetchLuckyDrawList();
    getMyGgulToken();

    return () => setActive(true);
  }, []);

  const handleClickDrawButton = (id: number) => {
    navigate(`${PathNames.GGULPAY.LUCKY_DRAW_ENTRY.path}/${id}`);
  };

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="상품 응모" />}
        left={<BackButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow />
      </div>
      <PageContainer>
        <div className="mb-12 pt-5">
          <div>
            <p className="mb-1 text-xl font-bold">추첨 상품</p>
            <div className="flex flex-col gap-3">
              {luckDrawList.length ? (
                luckDrawList.map((item) => (
                  <LuckyDrawItem
                    key={item.id}
                    luckyDrawItem={item}
                    onClickEvent={handleClickDrawButton}
                  />
                ))
              ) : (
                <div className="flex flex-col">
                  <p>현재 응모 중인 상품이 없습니다.</p>
                  <Lottie
                    animationData={no_items}
                    className="w-full self-center"
                    loop={true}
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                  />
                </div>
              )}
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
