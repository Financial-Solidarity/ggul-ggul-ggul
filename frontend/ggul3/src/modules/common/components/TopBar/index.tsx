import { useLayoutStore } from '../../store/useLayoutStore';

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
  const TopBarMenu = useLayoutStore((state) => state.topBarMenu);

  return (
    <div className={`TOP-BAR sticky ${bgColor} w-full h-12 `}>
      <ul className="flex flex-row justify-between  w-full h-12 px-4">
        <li className="bg-slate-300 w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {left}
        </li>
        <li className="bg-slate-300 w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {center}
        </li>
        <li className="bg-slate-300 w-max min-w-10 h-12 flex flex-row justify-center items-center">
          {right}
        </li>
      </ul>
    </div>
  );
};
