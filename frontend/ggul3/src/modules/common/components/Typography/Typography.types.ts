import { ReactNode } from 'react';

import { TColor } from '../../../themes/themeBase';

export type TTypographySize =
  | '6xs'
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export type TTypographyWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export interface TypographyProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  size?: TTypographySize;
  color?: TColor;
  weight?: TTypographyWeight;
  classNameStyles?: string;
}
