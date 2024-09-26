import { Button } from '@nextui-org/button';
import { PropsWithChildren } from 'react';

interface UserButtonProps {}

export const UserButton = ({
  children,
}: PropsWithChildren<UserButtonProps>) => {
  return (
    <Button
      className="w-full"
      color="primary"
      radius="full"
      size="lg"
      type="submit"
    >
      {children}
    </Button>
  );
};
