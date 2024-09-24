import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface WalletHeaderProps {
  isScrolled: boolean;
}

export const WalletHeader = ({ isScrolled }: WalletHeaderProps) => {
  return (
    <div
      className={`flex flex-col items-center bg-primary ${isScrolled ? 'py-6' : 'py-11'} text-white transition-all duration-200`}
    >
      <p>example@test.co.kr 님의 계좌</p>
      <p className="flex text-xs text-gray-300">
        an3kj56na3jk643njk53n6jk43n3na5jk234n76jk
        <DocumentDuplicateIcon className="w-4 cursor-pointer" />
      </p>
      <p className="py-3 text-2xl">100 GGUL TOKEN</p>
    </div>
  );
};
