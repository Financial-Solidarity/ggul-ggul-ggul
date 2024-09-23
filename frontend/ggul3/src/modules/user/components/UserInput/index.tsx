import { Input } from '@nextui-org/input';

interface UserInputProps {
  label: string;
}

const UserInput = ({ label }: UserInputProps) => {
  return (
    <Input
      label={label}
      labelPlacement="inside"
      radius="full"
      size="sm"
      variant="bordered"
    />
  );
};

export default UserInput;
