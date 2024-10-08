import { ICircularImageProps } from './CircularImage.types';
import { circularImageStyles } from './CircularImage.styles';

export const CircularImage = ({
  imageUrl,
  altText,
  size = 'md',
  imgWidth = '100%',
  bgColor = 'blue',
  classNameStyles,
  children,
}: ICircularImageProps) => {
  const className = circularImageStyles({ size, bgColor });

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className} ${classNameStyles}`}
      style={{ borderRadius: '50%' }}
    >
      <img
        alt={altText}
        className="rounded-full"
        src={imageUrl}
        style={{ width: imgWidth, objectFit: 'cover' }}
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
