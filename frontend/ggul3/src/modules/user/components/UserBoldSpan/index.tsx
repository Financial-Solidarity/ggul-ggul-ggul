import { PropsWithChildren } from 'react';

export const UserBoldSpan = ({ children }: PropsWithChildren) => {
  return <span className="pr-1 font-bold text-primary">{children}</span>;
};
