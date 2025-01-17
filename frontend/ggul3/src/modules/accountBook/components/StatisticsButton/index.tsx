import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface StatisticsButtonProps {
  color: string;
  buttonImageUrl: string;
  description: string;
  link: string;
}

export const StatisticsButton = ({
  color,
  buttonImageUrl,
  description,
  link,
}: StatisticsButtonProps) => {
  return (
    <div className="flex-1">
      <Link to={link}>
        <Card
          className={`flex flex-1 bg-${color} text-black duration-200 ease-linear hover:bg-opacity-75`}
        >
          <CardBody className="flex flex-col items-center text-center">
            <Image height={84} src={buttonImageUrl} width={84} />
            <span className="text-gray text-sm font-medium">{description}</span>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
