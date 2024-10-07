interface PrizeSubjectProps {
  subject: string;
  value: string;
  color?: string;
}

export const PrizeSubject = ({ subject, value, color }: PrizeSubjectProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <p className="flex flex-col rounded-full border p-2 font-medium">
        <span className="text-xs">{subject}</span>{' '}
        <span className={`text-${color}`}>{value}</span>
      </p>
    </div>
  );
};
