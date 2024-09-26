import { Button } from '@nextui-org/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { SubTitle } from '../SubTitle';

export const TokenPossession = () => {
  return (
    <div className="mb-4 mt-6">
      <SubTitle title="보유 토큰" />
      <div className="flex flex-col gap-1 py-2">
        <TokenItem />
        <TokenItem />
        <TokenItem />
        <TokenItem />
        <TokenItem />
      </div>
    </div>
  );
};

const TokenItem = () => {
  return (
    <Button className="flex w-full justify-between border bg-white">
      <p className="font-medium">GGUL</p>
      <p className="flex items-center font-light text-gray-500">
        100 GGUL TOKEN <ChevronRightIcon className="w-4 pl-1" />{' '}
      </p>
    </Button>
  );
};
