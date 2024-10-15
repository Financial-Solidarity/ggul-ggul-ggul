import { FormEvent, PropsWithChildren } from 'react';

interface UserFormStyleBoxProps extends PropsWithChildren {
  submitEvent?: (e: FormEvent) => void;
}

export const UserFormStyleBox = ({
  children,
  submitEvent,
}: UserFormStyleBoxProps) => {
  return (
    <form
      className="my-auto flex flex-col content-center items-center justify-center"
      onSubmit={submitEvent}
    >
      {children}
    </form>
  );
};
