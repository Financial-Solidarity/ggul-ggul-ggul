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
