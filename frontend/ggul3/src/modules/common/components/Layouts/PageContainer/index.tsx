import { PropsWithChildren } from 'react';

import {
  BottomBarState,
  useBottomBarStore,
} from '@/modules/common/store/useBottomBarStore';

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
  const isBottomBarActivated = useBottomBarStore(
    (state: BottomBarState) => state.active,
  );

  return (
    <>
      <div
        className={`PAGE-CONTAINER ${bgColor} ${activePaddingX ? 'px-4' : 'px-0'} ${isBottomBarActivated ? 'pb-14' : 'pb-0'} w-full flex-1 overflow-auto`}
      >
        <div className="py-2">{titleContent}</div>

        {children}
      </div>
    </>
  );
};
