import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

interface CardButtonProps {
  image: string;
  title: string;
  titleSize?: 'sm' | 'md' | 'lg';
  description?: string;
  color?: string;
  bgColor?: string;
  selected?: boolean;
  onClick: () => void;
}

export const CardButton = ({
  image,
  title,
  titleSize = 'md',
  description,
  color = 'white',
  selected = false,
  bgColor = 'primary',

  onClick,
}: CardButtonProps) => (
  <Card
    isPressable
    className={twMerge(
      ['flex-1 rounded-xl p-1'],
      `text-${color} bg-${bgColor}`,
      !selected && 'grayscale',
    )}
    onClick={onClick}
  >
    <CardHeader className="flex-col items-start gap-2 pb-0">
      <h4
        className={twMerge([
          'text-lg font-semibold text-white',
          titleSize === 'sm' && 'text-base',
          titleSize === 'md' && 'text-xl',
          titleSize === 'lg' && 'text-2xl',
        ])}
      >
        {title}
      </h4>
      {description && (
        <p className="text-center text-sm text-white">{description}</p>
      )}
    </CardHeader>
    <CardBody className="flex w-full flex-col items-end justify-end p-2">
      <div>
        <Image alt={title} className="object-contain" src={image} />
      </div>
    </CardBody>
  </Card>
);
