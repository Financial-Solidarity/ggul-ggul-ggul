import { useEffect, useRef, useState } from 'react';

import { WalletHeader } from '../components/WalletHeader';
import { NftLinks, TokenPossession, TokenTradingHistory } from '../components';
import { useWalletStore } from '../store/walletStore';

import { BackButton } from '@/modules/common/components/BackButton/BackButton';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { NavTitle } from '@/modules/common/components';
import { useBottomBarStore } from '@/modules/common/store/useBottomBarStore';

export const WalletPage = () => {
  const { setActive } = useBottomBarStore();

  const { getMyGgulToken } = useWalletStore();

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
    setActive(true);
    getMyGgulToken();

    return () => setActive(true);
  }, []);

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
