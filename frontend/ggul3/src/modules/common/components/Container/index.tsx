import { PropsWithChildren } from 'react';

import { LayoutState, useLayoutStore } from '../../store/useLayoutStore';

interface PageContainerProps {
  activePaddingX?: boolean;
  bgColor?: string;
  titleContent?: React.ReactNode;
}
export const PageContainer = ({
  children,
  activePaddingX = true,
  bgColor = 'bg-white',
  titleContent,
}: PropsWithChildren<PageContainerProps>) => {
  const isBottomBarActivated = useLayoutStore(
    (state: LayoutState) => state.isBottomBarActivated,
  );

  return (
    <>
      <div
        className={`PAGE-CONTAINER ${bgColor} ${activePaddingX ? 'px-4' : 'px-0'} ${isBottomBarActivated ? 'pb-14' : 'pb-0'} flex-1 w-full bg-blue-500 overflow-auto`}
      >
        <div className="py-2">{titleContent}</div>

        {children}
      </div>
    </>
  );
};
