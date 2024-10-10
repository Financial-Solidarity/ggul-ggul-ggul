import { Card, CardBody } from '@nextui-org/card';
import { AccountItemDTO } from '@types';

import { AccountItem } from '../AccountItem';

interface AccountModalProps {
  currentAccount: AccountItemDTO | null;
}

export const CurrentAccount = ({ currentAccount }: AccountModalProps) => {
  return (
    <Card className="mb-2">
      <CardBody>
        <p className="mb-1">현재 연결된 계좌</p>
        <AccountItem account={currentAccount} />
      </CardBody>
    </Card>
  );
};
