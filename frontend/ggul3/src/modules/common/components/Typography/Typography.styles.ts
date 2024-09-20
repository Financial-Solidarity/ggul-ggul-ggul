import { tv } from 'tailwind-variants';

export const typographyStyles = tv({
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
      '6xs': 'text-[0.125rem]',
      '5xs': 'text-[0.25rem]',
      '4xs': 'text-[0.375rem]',
      '3xs': 'text-[0.5rem]',
      '2xs': 'text-[0.625rem]',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-[1.375rem]',
      '3xl': 'text-2xl',
      '4xl': 'text-[1.625rem]',
      '5xl': 'text-[1.75rem]',
      '6xl': 'text-[1.875rem]',
      '7xl': 'text-[2rem]',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
});
