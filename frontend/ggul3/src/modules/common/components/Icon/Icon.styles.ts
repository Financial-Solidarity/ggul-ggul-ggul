import { tv } from 'tailwind-variants';

export const iconStyles = tv({
  variants: {
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      danger: 'text-danger-500',
      warning: 'text-warning-500',
      dark: 'text-black',
      light: 'text-white',
    },
    size: {
      '3xs': 'text-[0.5rem]',
      '2xs': 'text-[0.75rem]',
      xs: 'text-base',
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-[1.75rem]',
      xl: 'text-[2rem]',
      '2xl': 'text-[2.25rem]',
      '3xl': 'text-[2.5rem]',
    },
  },
});
