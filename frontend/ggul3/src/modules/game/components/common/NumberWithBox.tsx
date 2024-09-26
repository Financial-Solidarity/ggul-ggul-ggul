export interface NumberWithBoxProps {
  number: string;
  withBox?: boolean;
}

export const NumberWithBox = ({
  number,
  withBox = true,
}: NumberWithBoxProps) => {
  return (
    <div
      className={`p-3 ${withBox ? 'rounded-md bg-primary-300' : 'bg-white'}`}
    >
      <p className="text-2xl font-bold text-white">{number}</p>
    </div>
  );
};
