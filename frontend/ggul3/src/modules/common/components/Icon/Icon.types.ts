export type TColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'dark'
  | 'light';

export type TIconSize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export interface IconProps extends React.ComponentProps<'span'> {
  children: React.ReactNode;
  size?: TIconSize;
  color?: TColor;
  classNameStyles?: string;
}
