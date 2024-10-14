import { Button } from '@nextui-org/button';
import { ButtonProps } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

export const UserButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      className="mb-3 w-full"
      color="primary"
      radius="full"
      size="lg"
      type="submit"
      {...props}
    >
      {children}
    </Button>
  );
};
