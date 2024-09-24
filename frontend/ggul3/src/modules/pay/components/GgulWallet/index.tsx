import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import wallet from '@/assets/images/wallet.png';
import { PathNames } from '@/router';

const GgulWallet = () => {
  return (
    <Link to={PathNames.GGULPAY.WALLET.path}>
      <Card className="mb-4 flex bg-primary-500 py-1 text-black">
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

export default GgulWallet;
