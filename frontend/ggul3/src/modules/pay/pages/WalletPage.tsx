import { useEffect, useRef, useState } from 'react';

import { WalletHeader } from '../components/WalletHeader';
import { NftLinks, TokenPossession, TokenTradingHistory } from '../components';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { NotificationButton } from '@/modules/common/components/NotificationButton/NotificationButton';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { NavTitle } from '@/modules/common/components';

export const WalletPage = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (pageContainerRef.current && pageContainerRef.current.scrollTop > 0) {
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
        center={<NavTitle color="white" title="전자 지갑" />}
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
