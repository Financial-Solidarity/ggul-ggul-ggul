import { NumberWithBox } from './NumberWithBox.tsx';

interface GroupNumberWithBoxProps {
  number: number;
  withLabel?: boolean;
}
export const GroupNumberWithBox = ({
  number,
  withLabel = true,
}: GroupNumberWithBoxProps) => {
  const stringNumbers = formatNumberToStringArray(number);

  return (
    <div
      className={`${withLabel && 'ml-8 justify-center'} flex items-center gap-[0.35rem]`}
    >
      {stringNumbers.map((char, idx) => (
        <NumberWithBox key={idx} number={char} />
      ))}
      <div className="ml-2 text-lg font-semibold text-white">맛도리</div>
    </div>
  );
};

const formatNumberToStringArray = (number: number): string[] => {
  return number.toString().padStart(3, '0').split('');
};
