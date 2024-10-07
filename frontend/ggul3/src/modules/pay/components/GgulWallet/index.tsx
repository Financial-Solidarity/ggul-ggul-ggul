import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import wallet from '@/assets/images/wallet.png';
import { PathNames } from '@/router';

export const GgulWallet = () => {
  return (
    <Link to={PathNames.GGULPAY.WALLET.path}>
      <Card className="flex cursor-pointer bg-primary py-1 text-black duration-200 ease-linear hover:bg-opacity-70">
        <CardHeader className="flex justify-center">
          <Image height={74} src={wallet} width={65} />
        </CardHeader>
        <CardBody className="py-0 pb-2 text-center">
          <p className="text-nowrap text-base text-white">전자지갑</p>
        </CardBody>
      </Card>
    </Link>
  );
};
