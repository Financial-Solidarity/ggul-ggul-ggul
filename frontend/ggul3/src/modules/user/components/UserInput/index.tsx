import { Input } from '@nextui-org/input';

interface UserInputProps {
  label: string;
  description?: string;
  errorMessage?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  setValue: (value: string) => void;
  validate?: () => void;
}

export const UserInput = ({
  type = 'text',
  value,
  description,
  errorMessage,
  label,
  setValue,
  validate,
}: UserInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (validate) {
      validate();
    }
  };

  return (
    <>
      <Input
        required
        description={description}
        label={label}
        labelPlacement="inside"
        radius="full"
        size="sm"
        type={type}
        value={value}
        variant="bordered"
        onChange={handleOnChange}
      />
      {errorMessage && (
        <span className="ml-4 self-start text-danger">* {errorMessage}</span>
      )}
    </>
  );
};
