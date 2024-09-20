import { useLayoutStore } from '../../store/useLayoutStore';

interface BottomBarProps {}

export const BottomBar = ({}: BottomBarProps) => {
  const isBottomBarActivated = useLayoutStore(
    (state) => state.isBottomBarActivated,
  );

  return (
    <>
      {isBottomBarActivated && (
        <div className="BOTTOM-BAR fixed bottom-0 bg-red-500 flex flex-row justify-between w-full h-14 px-2">
          <ul>
            <li />
            <li />
          </ul>
        </div>
      )}
    </>
  );
};
