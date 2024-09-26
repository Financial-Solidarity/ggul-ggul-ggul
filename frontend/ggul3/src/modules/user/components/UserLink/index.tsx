import { Link } from '@nextui-org/link';
import { PropsWithChildren } from 'react';

interface UserLinkProps {
  type: string;
}

export const UserLink = ({
  children,
  type,
}: PropsWithChildren<UserLinkProps>) => {
  if (type === 'gray') {
    return (
      <Link className="text-gray-500" href="#" size="sm" underline="always">
        {children}
      </Link>
    );
  } else if (type === 'bold') {
    return (
      <Link className="text-xl font-bold text-black" href="#" size="lg">
        {children}
      </Link>
    );
  }
};
