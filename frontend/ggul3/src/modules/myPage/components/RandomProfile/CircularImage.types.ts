import { ReactNode } from 'react';

export interface ICircularImageProps {
  imageUrl: string | undefined;
  altText: string | undefined;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  imgWidth?: string;
  bgColor?:
    | 'pink'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'orange'
    | 'gray'
    | 'red'
    | 'teal'
    | 'indigo';
  classNameStyles?: string;
  children?: ReactNode;
}
