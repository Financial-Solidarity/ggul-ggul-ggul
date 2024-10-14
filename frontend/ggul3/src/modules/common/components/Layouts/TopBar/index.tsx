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
      <ul className="flex h-12 w-full flex-row justify-between px-2">
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center">
          {left}
        </li>
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center">
          {center}
        </li>
        <li className="flex h-12 w-max min-w-10 flex-row items-center justify-center">
          {right}
        </li>
      </ul>
    </div>
  );
};
