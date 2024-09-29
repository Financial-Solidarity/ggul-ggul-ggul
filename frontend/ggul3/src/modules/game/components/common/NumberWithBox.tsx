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
      className={`w-8 p-2 ${withBox ? 'rounded-md bg-primary-300' : 'bg-white'}`}
    >
      <p className="text-center text-xl font-bold text-white">{number}</p>
    </div>
  );
};
