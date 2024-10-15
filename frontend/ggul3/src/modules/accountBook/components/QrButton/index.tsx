import { QrCodeIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { useNavigate } from 'react-router-dom';

import { PathNames } from '@/router';

export const QrButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(PathNames.ACCOUNT_BOOK.QR_CODE.path)}>
      <Card className="flex cursor-pointer bg-slate-300 text-black duration-200 ease-linear hover:bg-opacity-70">
        <CardBody>
          <div className="flex content-center items-center justify-between">
            <p className="flex flex-col text-lg leading-6">
              <span>QR 코드로</span>
              <span>결제하기</span>
            </p>
            <QrCodeIcon className="size-16" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
