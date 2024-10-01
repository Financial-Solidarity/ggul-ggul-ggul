import { PropsWithChildren } from 'react';

export const UserBoldParagraph = ({ children }: PropsWithChildren) => {
  return <p className="text-lg font-medium leading-6 text-black">{children}</p>;
};
