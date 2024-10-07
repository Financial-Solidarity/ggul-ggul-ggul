import { useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import { GgulPoint, PrizeSubject } from '../components';
import { useWalletStore } from '../store/walletStore';
import { prizeHistory } from '../apis/luckyDraw';
import { useLuckyDrawStore } from '../store/luckyDrawStore';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

export const PrizeHistoryPage = () => {
  const { getMyGgulToken } = useWalletStore();
  const { luckDrawHistory, setLuckDrawHistory } = useLuckyDrawStore();

  useEffect(() => {
    const fetchPrizeHistory = async () => {
      const response = await prizeHistory();

      console.log(response);
      setLuckDrawHistory(response.content);
    };

    fetchPrizeHistory();
    getMyGgulToken();
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
              {luckDrawHistory.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md bg-gray-100 p-3 shadow-xl"
                >
                  <Image
                    removeWrapper
                    alt="Card image background"
                    className="z-0 mb-3 h-full w-full object-contain"
                    src={item.application.imageUrl}
                  />
                  <p className="mb-1 text-center text-xl font-bold">
                    {item.application.title}
                  </p>

                  <div className="mb-3 flex w-full gap-3 text-center">
                    <PrizeSubject
                      color={'primary'}
                      subject="당첨 여부"
                      value={`${item.isSuccess ? '성공' : '실패'}`}
                    />
                    <PrizeSubject
                      color="primary"
                      subject="당첨 확률"
                      value={`${(item.application.probability as number) * 100}%`}
                    />
                    <PrizeSubject
                      color="primary"
                      subject="응모 가격"
                      value={`${item.application.price}P`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Link className="flex-1" to={item.transactionUrl}>
                      <Button className="w-full">블록체인 기록 보러가기</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};
