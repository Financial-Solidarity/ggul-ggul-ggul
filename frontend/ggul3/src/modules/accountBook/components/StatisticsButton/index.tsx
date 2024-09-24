import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/react';

interface StatisticsButtonProps {
  color: string;
  buttonImageUrl: string;
  displayValue: string;
  description: string;
}

export const StatisticsButton = ({
  color,
  buttonImageUrl,
  displayValue,
  description,
}: StatisticsButtonProps) => {
  return (
    <Card className={`flex flex-1 bg-${color}-500 text-black`}>
      <CardBody className="flex flex-col items-center text-center">
        <Image height={84} src={buttonImageUrl} width={84} />
        <span className="font-bold">{displayValue}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </CardBody>
    </Card>
  );
};
