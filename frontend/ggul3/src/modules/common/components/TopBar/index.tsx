interface TopBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  bgColor?: string;
}

export const TopBar = ({
  left,
  center,
  right,
  bgColor = 'bg-white',
}: TopBarProps) => {
  return (
    <div className={`TOP-BAR sticky ${bgColor} h-12 w-full`}>
      <ul className="flex h-12 w-full flex-row justify-between px-4">
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center bg-slate-300">
          {left}
        </li>
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center bg-slate-300">
          {center}
        </li>
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center bg-slate-300">
          {right}
        </li>
      </ul>
    </div>
  );
};
