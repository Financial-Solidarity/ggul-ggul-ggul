import { Button } from '@nextui-org/react';

import { SubTitle } from '../SubTitle';
import { useWalletStore } from '../../store/walletStore';

export const TokenPossession = () => {
  const { ggulToken } = useWalletStore();

  return (
    <div className="mb-4 mt-6">
      <SubTitle title="보유 토큰" />
      <div className="flex flex-col gap-1 py-2">
        <TokenItem value={ggulToken} />
      </div>
    </div>
  );
};

const TokenItem = ({ value }: { value: number }) => {
  return (
    <Button className="flex w-full justify-between border bg-white">
      <p className="font-medium">{value}</p>
      <p className="text-gray flex items-center font-light">
        {value} GGUL TOKEN
        {/* <ChevronRightIcon className="w-4 pl-1" /> */}
      </p>
    </Button>
  );
};
