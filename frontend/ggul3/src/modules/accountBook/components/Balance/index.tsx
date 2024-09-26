import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { PropsWithChildren, useState } from 'react';

export const Balance = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Card className="mb-4 flex bg-primary text-center text-white">
      <CardHeader className="flex justify-between">
        <div>
          <SmallText>계좌 잔고</SmallText>
        </div>
        <div className="flex items-center">
          <SmallText>금액 표시</SmallText>
          <ToggleBalanceVisibilityButton
            setVisible={setVisible}
            visible={visible}
          />
        </div>
      </CardHeader>
      <CardBody className="text-center">
        <div className="text-2xl">
          {visible ? (
            '12,345,678,910,111 원'
          ) : (
            <p className="text-gray-300">금액 숨김</p>
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <SmallText>연동 계좌번호 {'123-******-***789'}</SmallText>
      </CardFooter>
    </Card>
  );
};

const SmallText = ({ children }: PropsWithChildren) => {
  return <p className="text-xs">{children}</p>;
};

interface ToggleBalanceVisibilityButtonProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ToggleBalanceVisibilityButton = ({
  visible,
  setVisible,
}: ToggleBalanceVisibilityButtonProps) => {
  return (
    <Button
      className="ml-1 bg-white px-0 font-bold text-primary"
      radius="full"
      size="sm"
      onClick={() => setVisible(!visible)}
    >
      {visible ? 'ON' : 'OFF'}
    </Button>
  );
};
