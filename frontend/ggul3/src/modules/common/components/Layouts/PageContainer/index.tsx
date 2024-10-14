import { PropsWithChildren, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  BottomBarState,
  useBottomBarStore,
} from '@/modules/common/store/useBottomBarStore';

interface PageContainerProps {
  activePaddingX?: boolean;
  bgColor?: string;
  titleContent?: React.ReactNode;
  containerRef?: Ref<HTMLDivElement>;
}

export const PageContainer = ({
  children,
  activePaddingX = true,
  bgColor = 'bg-white',
  titleContent,
  containerRef,
}: PropsWithChildren<PageContainerProps>) => {
  const isBottomBarActivated = useBottomBarStore(
    (state: BottomBarState) => state.active,
  );

  return (
    <>
      <div
        ref={containerRef}
        className={twMerge([
          'PAGE-CONTAINER',
          'relative flex h-full w-full flex-1 flex-col overflow-auto',
          bgColor,
          activePaddingX ? 'px-4' : 'px-0',
          isBottomBarActivated ? 'pb-16' : 'pb-0',
        ])}
      >
        {titleContent && <div className="py-2">{titleContent}</div>}
        {children}
      </div>
    </>
  );
};
