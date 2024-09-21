import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'flex flex-col items-center cursor-pointer transition-colors duration-300',
  variants: {
    isActive: {
      true: '',
      false: 'text-gray-400',
    },
    isDarkMode: {
      true: {
        true: 'text-white',
        false: 'text-gray-400',
      },
      false: {
        true: 'text-primary-400',
        false: 'text-gray-400',
      },
    },
  },
  compoundVariants: [
    {
      isActive: true,
      isDarkMode: false,
      class: 'text-primary-700',
    },
    {
      isActive: true,
      isDarkMode: true,
      class: 'text-white', // 다크 모드에서 활성화된 버튼은 흰색
    },
  ],
});

export const centerButtonStyles = tv({
  base: 'rounded-full h-16 w-16 flex justify-center items-center border-2 transition-all duration-300',
  variants: {
    isActive: {
      true: 'bg-primary-400 shadow-lg shadow-purple-500/50 border-primary-400',
      false: 'bg-primary-500 border-primary-400',
    },
  },
});

export const boxShadowStyle = (isActive: boolean) =>
  isActive
    ? '0 0 20px rgba(128, 90, 213, 0.6), 0 0 40px rgba(128, 90, 213, 0.3)'
    : 'none';
