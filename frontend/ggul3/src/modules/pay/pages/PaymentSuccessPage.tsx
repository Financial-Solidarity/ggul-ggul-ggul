import { BsCheckCircleFill, BsChevronLeft } from 'react-icons/bs';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { NavTitle } from '@/modules/common/components';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PathNames } from '@/router';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const PaymentSuccessPage = () => {
  const { setActive } = useBottomBarStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get('product-name');
  const market = searchParams.get('market');

  useEffect(() => {
    setActive(true);

    return () => setActive(true);
  }, []);

  return (
    <>
      <TopBar center={<NavTitle title="껄 페이" />} />
      <PageContainer>
        <div className="flex h-full flex-col items-center justify-center">
          <BsCheckCircleFill className="mb-8 h-40 w-40 text-green-500" />
          <p className="mb-6 text-xl font-bold">결제에 성공하였습니다.</p>
          <div className="mb-6 w-52 text-gray-500">
            <div className="flex justify-between">
              <p>제품 이름:</p>
              <p className="text-black">{productName}</p>
            </div>
            <div className="flex justify-between">
              <p>상호 이름:</p>
              <p className="text-black">{market}</p>
            </div>
          </div>
          <Button className="flex items-center" color="primary" size="lg">
            <BsChevronLeft />
            <Link replace to={PathNames.ACCOUNT_BOOK.HISTORY.path}>
              결제 내역으로 돌아가기
            </Link>
          </Button>
        </div>
      </PageContainer>
    </>
  );
};
