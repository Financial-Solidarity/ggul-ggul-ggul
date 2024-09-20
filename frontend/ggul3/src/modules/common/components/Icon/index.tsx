import { IconProps } from './Icon.types';
import { iconStyles } from './Icon.styles';

export const Icon = ({
  children,
  size = 'md',
  color = 'primary',
  classNameStyles,
}: IconProps) => {
  const iconStyle = iconStyles({
    color,
    size,
  });

  return <span className={`${iconStyle} ${classNameStyles}`}>{children}</span>;
};
