import { PropsWithChildren } from 'react';

export const SmallText = ({ children }: PropsWithChildren) => {
  return <p className="text-xs">{children}</p>;
};
