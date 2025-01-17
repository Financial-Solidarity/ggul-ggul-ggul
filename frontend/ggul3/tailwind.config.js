import { nextui } from '@nextui-org/theme';

import { myPurple, myMint, myYellow } from './src/styles/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        popIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '100%': { opacity: '1' },
          '0%': { opacity: '0' },
        },
        pulseScale: {
          '0%, 100%': {
            transform: 'scale(1)',
            borderColor: 'theme("colors.dr-coral-50")',
          },
          '50%': {
            transform: 'scale(1.05)',
            borderColor: 'theme("colors.dr-coral-300")',
          },
        },
        floating: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-4px)',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        popIn: 'popIn 0.25s ease-out',
        fadeIn: 'fadeIn 0.35s ease-out',
        pulseScale: 'pulseScale 2s infinite ease-in-out',
        floating: 'floating 2s infinite ease-in-out ',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              ...myPurple,
              DEFAULT: myPurple[500],
              foreground: '#ffffff',
            },
            secondary: {
              ...myYellow,
              DEFAULT: myYellow[500],
              foreground: '#ffffff',
            },
            success: {
              ...myMint,
              DEFAULT: myMint[500],
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              ...myPurple,
              DEFAULT: myPurple[500],
              foreground: '#ffffff',
            },
            secondary: {
              ...myYellow,
              DEFAULT: myYellow[500],
              foreground: '#ffffff',
            },
            success: {
              ...myMint,
              DEFAULT: myMint[500],
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};
