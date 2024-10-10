import { useEffect } from 'react';
import Lottie from 'lottie-react';

import { GgulPoint, PrizeItem } from '../components';
import { useWalletStore } from '../store/walletStore';
import { useLuckyDrawStore } from '../store/luckyDrawStore';
import { getPrizeHistory } from '../apis/luckyDraw';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import no_items from '@/assets/lotties/no_items.json';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const PrizeHistoryPage = () => {
  const { setActive } = useBottomBarStore();

  const { getMyGgulToken } = useWalletStore();
  const { luckDrawHistory, setLuckDrawHistory } = useLuckyDrawStore();

  useEffect(() => {
    const fetchPrizeHistory = async () => {
      const response = await getPrizeHistory();

      setLuckDrawHistory(response.content);
    };

    fetchPrizeHistory();
    setActive(true);
    getMyGgulToken();

    return () => setActive(true);
  }, []);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="응모 내역" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow />
      </div>
      <PageContainer>
        <div className="mb-12 pt-5">
          <div>
            <div className="flex flex-col gap-3">
              {luckDrawHistory.length ? (
                luckDrawHistory.map((item, index) => (
                  <PrizeItem key={index} item={item} />
                ))
              ) : (
                <div className="flex flex-col">
                  <p>현재 응모한 상품 기록이 없습니다.</p>
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
