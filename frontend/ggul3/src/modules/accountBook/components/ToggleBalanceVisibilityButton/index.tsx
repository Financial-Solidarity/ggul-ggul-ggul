import { Button } from '@nextui-org/button';

interface ToggleBalanceVisibilityButtonProps {
  isMoneyVisible: boolean;
  setIsMoneyVisible: (isMoneyVisible: boolean) => void;
}

export const ToggleBalanceVisibilityButton = ({
  isMoneyVisible,
  setIsMoneyVisible,
}: ToggleBalanceVisibilityButtonProps) => {
  return (
    <Button
      className="ml-1 bg-white px-0 font-bold text-primary"
      radius="full"
      size="sm"
      onClick={() => setIsMoneyVisible(!isMoneyVisible)}
    >
      {isMoneyVisible ? 'ON' : 'OFF'}
    </Button>
  );
};
