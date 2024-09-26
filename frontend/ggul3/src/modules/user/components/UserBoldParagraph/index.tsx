import { PropsWithChildren } from 'react';

export const UserBoldParagraph = ({ children }: PropsWithChildren) => {
  return <p className="text-xl font-bold text-black">{children}</p>;
};
