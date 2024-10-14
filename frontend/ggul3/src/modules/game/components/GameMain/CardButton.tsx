import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface CardButtonProps {
  image: string;
  title: string;
  description?: string;
  color: string;
  type: 'left' | 'right' | 'bottom';
  onClick: () => void;
}

export const CardButton: React.FC<CardButtonProps> = ({
  image,
  title,
  description,
  color,
  type,
  onClick,
}) => (
  <Card
    isHoverable
    isPressable
    className={`flex-1 rounded-xl p-1 ${color}`}
    onClick={onClick}
  >
    <CardHeader className="flex-col items-start gap-2 pb-0">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      {description && (
        <p className="text-center text-sm text-white">{description}</p>
      )}
    </CardHeader>
    <CardBody className="flex w-full flex-col items-end justify-end p-2">
      <div className={type === 'right' ? 'w-14' : 'w-32'}>
        <Image alt={title} className="object-contain" src={image} />
      </div>
    </CardBody>
  </Card>
);
