import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Drawer = ({
  isOpen,
  children,
  onClose,
}: PropsWithChildren<DrawerProps>) => {
  return (
    <div
      className={twMerge([
        'fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0', // 백드롭의 투명도 조절 및 닫힐 때 클릭 방지
      ])}
      onClick={onClose}
    >
      <div
        className={twMerge([
          'fixed right-0 top-0 z-50 h-full w-72 bg-white transition-transform duration-300', // 패널 트랜지션 적용
          isOpen ? 'translate-x-0' : 'translate-x-full', // 패널 슬라이드 효과
        ])}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
