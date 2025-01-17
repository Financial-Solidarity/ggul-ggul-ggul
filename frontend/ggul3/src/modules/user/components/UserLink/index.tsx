import { Link } from '@nextui-org/link';
import { PropsWithChildren } from 'react';

interface UserLinkProps {
  type: string;
  to: string;
}

export const UserLink = ({
  children,
  type,
  to,
}: PropsWithChildren<UserLinkProps>) => {
  if (type === 'gray') {
    return (
      <Link className="pb-2 text-end" href={to} size="sm" underline="always">
        {children}
      </Link>
    );
  } else if (type === 'bold') {
    return (
      <Link className="font-medium text-black" href={to} size="lg">
        {children}
      </Link>
    );
  }
};
