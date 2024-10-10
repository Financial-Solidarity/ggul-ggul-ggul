import { useEffect, useState } from 'react';
import { LuckyDrawDetailDTO } from '@types';
import { useParams } from 'react-router-dom';
import { Card, Image, Skeleton, useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

import { GgulPoint, PrizeSubject, ResultModal } from '../components';
import { useWalletStore } from '../store/walletStore';
import { LuckyDrawDTO, getLuckyDrawDetail } from '../apis/luckyDraw';

import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { toYYMDhm } from '@/modules/common/utils/dateUtils';
import { useLuckDrawMutation } from '@/modules/myPage/queries/useLuckyDrawQuery';
import { executeMutationAsAsync } from '@/modules/common/utils/executeMutationAsAsync';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const LuckyDrawDetailPage = () => {
  const { setActive } = useBottomBarStore();

  const params = useParams();
  const applicationId = Number(params.id);

  const { mutate: luckyDraw, isPending } = useLuckDrawMutation();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { ggulToken, getMyGgulToken } = useWalletStore();
  const [item, setItem] = useState<LuckyDrawDetailDTO | null>(null);

  const [result, setResult] = useState<LuckyDrawDTO | null>(null);

  useEffect(() => {
    setActive(true);

    const getGgulToken = async () => {
      if (!ggulToken) {
        getMyGgulToken();
      }
    };
    const fetchLuckyDrawDetail = async () => {
      const detail = await getLuckyDrawDetail(applicationId);

      setItem(detail);
    };

    getGgulToken();
    fetchLuckyDrawDetail();

    return () => setActive(true);
  }, []);

  const handleClickDrawButton = async () => {
    try {
      const response = await executeMutationAsAsync<number, LuckyDrawDTO>(
        luckyDraw,
        applicationId,
      );

      onOpen();
      setResult(response);
      getMyGgulToken();
    } catch (error) {
      // @ts-ignore
      window.alert(error.message);
    }
  };

  console.log(item, 'item');

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="상품 응모 상세" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow />
      </div>
      <PageContainer>
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            {item ? (
              <>
                <Image
                  removeWrapper
                  alt="Card image background"
                  className="z-0 mb-3 h-full w-full object-contain"
                  src={item?.imageUrl}
                />
                <p className="mb-1 text-xl font-bold">{item?.title}</p>
                <div className="flex w-full gap-3">
                  <PrizeSubject
                    color="primary"
                    subject="당첨 확률"
                    value={`${(item?.probability as number) * 100}%`}
                  />
                  <PrizeSubject
                    color="primary"
                    subject="응모 가격"
                    value={`${item?.price}P`}
                  />
                  <PrizeSubject
                    color="primary"
                    subject="당첨 수량"
                    value={`${item?.maxWinnerCount}`}
                  />
                </div>
                <Button
                  className="w-full"
                  color={`${item?.status ? 'primary' : 'default'}`}
                  isLoading={isPending}
                  onClick={handleClickDrawButton}
                >
                  응모하기
                </Button>

                <p className="mb-10 flex flex-col text-sm text-gray-500">
                  응모 시작 시간
                  <span>{toYYMDhm(item?.createdAt as string)}</span>
                </p>
              </>
            ) : (
              <>
                <Card className="w-full space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-48 rounded-lg bg-default-300" />
                  </Skeleton>
                </Card>
                <Card className="w-full space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-48 rounded-lg bg-default-300" />
                  </Skeleton>
                </Card>
                <Card className="w-full space-y-5 p-4" radius="lg">
                  <Skeleton className="rounded-lg">
                    <div className="h-48 rounded-lg bg-default-300" />
                  </Skeleton>
                </Card>
              </>
            )}
          </div>
        </div>

        <ResultModal
          chance={item?.probability as number}
          drawEvent={handleClickDrawButton}
          isOpen={isOpen}
          result={result}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </PageContainer>
    </>
  );
};
