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
      <Link className="text-gray" href={to} size="sm" underline="always">
        {children}
      </Link>
    );
  } else if (type === 'bold') {
    return (
      <Link className="font-bold text-black" href={to} size="lg">
        {children}
      </Link>
    );
  }
};
