import { NumberWithBox } from '../NumberWithBox.tsx';

interface GroupNumberWithBoxProps {
  number: number;
}
export const GroupNumberWithBox = ({ number }: GroupNumberWithBoxProps) => {
  const stringNumbers = formatNumberToStringArray(number);

  return (
    <div className="flex items-center justify-center gap-2">
      {stringNumbers.map((char, idx) => (
        <NumberWithBox key={idx} number={char} />
      ))}
    </div>
  );
};

const formatNumberToStringArray = (number: number): string[] => {
  return number.toString().padStart(3, '0').split('');
};
