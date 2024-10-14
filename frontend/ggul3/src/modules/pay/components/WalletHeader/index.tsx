import { Snippet } from '@nextui-org/react';
import { useEffect } from 'react';

import { useWalletStore } from '../../store/walletStore';

import { useUserStore } from '@/modules/common/store/userStore';

interface WalletHeaderProps {
  isScrolled: boolean;
}

export const WalletHeader = ({ isScrolled }: WalletHeaderProps) => {
  const { myWallet, ggulToken, getMyWallet } = useWalletStore();
  const { user } = useUserStore();

  useEffect(() => {
    getMyWallet();
  }, []);

  return (
    <div
      className={`flex flex-col items-center bg-primary ${isScrolled ? 'py-6' : 'py-12'} text-white transition-all duration-200`}
    >
      <p className="z-10">{user?.username} 님의 계좌</p>
      <Snippet
        hideSymbol
        className="flex -translate-y-2 bg-primary-500 leading-3 text-gray-300"
        size="sm"
      >
        {myWallet?.address}
      </Snippet>

      <p className="py-0 text-2xl">{ggulToken} GGUL TOKEN</p>
    </div>
  );
};
