import { QrCodeIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { useState } from 'react';

export const QrButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Card className="mb-4 flex bg-slate-300 text-black">
      <CardBody>
        <div className="flex content-center items-center justify-between">
          <p className="flex flex-col text-xl">
            <span>QR 코드로</span>
            <span>결제하기</span>
          </p>
          <QrCodeIcon className="size-16" />
        </div>
      </CardBody>
    </Card>
  );
};
