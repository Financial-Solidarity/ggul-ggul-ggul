import { PropsWithChildren } from 'react';

export const UserInputBox = ({ children }: PropsWithChildren) => {
  return <div className="mb-3 flex w-full flex-col gap-2">{children}</div>;
};
