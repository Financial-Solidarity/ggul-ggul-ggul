import { PropsWithChildren } from 'react';

const UserBoldParagraph = ({ children }: PropsWithChildren) => {
  return <p className="text-xl font-bold text-black">{children}</p>;
};

export default UserBoldParagraph;
