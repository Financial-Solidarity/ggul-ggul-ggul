import { Card, CardBody } from '@nextui-org/card';
import { Account } from '@types';

import { AccountItem } from '../AccountItem';

interface CurrentAccountProps {
  currentAccount: Account;
}

export const CurrentAccount = ({ currentAccount }: CurrentAccountProps) => {
  return (
    <Card className="mb-2">
      <CardBody>
        <p>현재 연결된 계좌</p>
        <AccountItem account={currentAccount} />
      </CardBody>
    </Card>
  );
};
