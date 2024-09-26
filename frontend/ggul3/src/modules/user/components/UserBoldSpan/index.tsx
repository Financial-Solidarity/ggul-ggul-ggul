import { PropsWithChildren } from 'react';

export const UserBoldSpan = ({ children }: PropsWithChildren) => {
  return <span className="pr-1 text-primary-500">{children}</span>;
};
