import { Snippet } from '@nextui-org/react';

interface WalletHeaderProps {
  isScrolled: boolean;
}

export const WalletHeader = ({ isScrolled }: WalletHeaderProps) => {
  return (
    <div
      className={`flex flex-col items-center bg-primary ${isScrolled ? 'py-6' : 'py-12'} text-white transition-all duration-200`}
    >
      <p className="z-10">example@test.co.kr 님의 계좌</p>
      <Snippet
        hideSymbol
        className="flex -translate-y-2 bg-primary-500 leading-3 text-gray-300"
        size="sm"
      >
        {`1247128394573298rfdgsfgdfggf234y98ry`}
      </Snippet>

      <p className="py-0 text-2xl">100 GGUL TOKEN</p>
    </div>
  );
};
