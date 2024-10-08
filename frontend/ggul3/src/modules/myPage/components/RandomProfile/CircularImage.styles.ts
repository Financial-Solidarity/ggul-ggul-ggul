import { tv } from 'tailwind-variants';

export const circularImageStyles = tv({
  base: 'rounded-full object-cover',
  variants: {
    size: {
      '2xs': 'w-4 h-4',
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
      '2xl': 'w-24 h-24',
      '3xl': 'w-36 h-36',
    },
    bgColor: {
      pink: 'bg-pink-200 hover:bg-pink-400 transition-colors duration-300',
      blue: 'bg-blue-200 hover:bg-blue-400 transition-colors duration-300',
      green: 'bg-green-200 hover:bg-green-400 transition-colors duration-300',
      yellow:
        'bg-yellow-200 hover:bg-yellow-400 transition-colors duration-300',
      purple:
        'bg-purple-200 hover:bg-purple-400 transition-colors duration-300',
      orange:
        'bg-orange-200 hover:bg-orange-400 transition-colors duration-300',
      gray: 'bg-gray-200 hover:bg-gray-400 transition-colors duration-300',
      red: 'bg-red-200 hover:bg-red-400 transition-colors duration-300',
      teal: 'bg-teal-200 hover:bg-teal-400 transition-colors duration-300',
      indigo:
        'bg-indigo-200 hover:bg-indigo-400 transition-colors duration-300',
    },
  },
  defaultVariants: {
    size: 'md',
    bgColor: 'blue',
  },
});
