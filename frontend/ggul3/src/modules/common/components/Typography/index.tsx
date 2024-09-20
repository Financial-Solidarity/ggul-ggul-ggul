import React from 'react';

import { TypographyProps } from './Typography.types';
import { typographyStyles } from './Typography.styles';

export const Typography = ({
  children,
  size = 'md',
  color = 'primary',
  weight = 'regular',
  classNameStyles,
}: TypographyProps) => {
  const typographyStyle = typographyStyles({
    size,
    color,
    weight,
  });

  return (
    <div className={`${typographyStyle} ${classNameStyles}`}>{children}</div>
  );
};
