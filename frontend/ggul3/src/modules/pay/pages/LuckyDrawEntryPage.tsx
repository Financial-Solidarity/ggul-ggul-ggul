import { Button } from '@nextui-org/button';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';

import { GgulPoint } from '../components';

import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NavTitle } from '@/modules/common/components';
import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
export const LuckyDrawEntryPage = () => {
  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle color="white" title="상품 응모" />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <div className="z-50 shadow-md">
        <GgulPoint isNarrow remainGgulToken={2250} />
      </div>
      <PageContainer>
        <div className="mb-12 pt-5">
          <div>
            <p className="mb-1 text-xl font-bold">추첨 상품</p>
            <div className="flex flex-col gap-3">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

const Item = () => {
  return (
    <Card className="col-span-12 h-[240px] w-full sm:col-span-5">
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="text-tiny font-bold uppercase text-white/60">New</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card image background"
        className="z-0 h-full w-full scale-125 object-cover"
        src="https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-zinc-100/50 bg-white/65 duration-200 hover:bg-white/85">
        <div>
          <p className="text-balck text-lg font-bold leading-6">
            최고급 카메라
          </p>
          <p className="text-lg font-bold leading-6 text-primary">
            250 <span>P</span>
          </p>
        </div>
        <Button color="primary" size="md">
          응모하기
        </Button>
      </CardFooter>
    </Card>
  );
};
