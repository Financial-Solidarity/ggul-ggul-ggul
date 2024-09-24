import { useEffect, useRef, useState } from 'react';

import { WalletHeader } from '../components/WalletHeader';
import TokenPossession from '../components/TokenPossession';
import TokenTradingHistory from '../components/TokenTradingHistory';
import NftLinks from '../components/NftLinks';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';

export const WalletPage = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (pageContainerRef.current && pageContainerRef.current.scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const container = pageContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <TopBar
        bgColor="bg-primary"
        center={<NavTitle />}
        left={<BackButton />}
        right={<NotificationButton />}
      />
      <WalletHeader isScrolled={isScrolled} />
      <PageContainer containerRef={pageContainerRef}>
        <TokenPossession />
        <TokenTradingHistory />
        <NftLinks />
      </PageContainer>
    </>
  );
};

function NavTitle() {
  return <p className="text-lg text-white">전자 지갑</p>;
}
