import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/react';

interface MyProfileProps {
  nickname: string;
  email: string;
}

export const MyProfile = ({ nickname, email }: MyProfileProps) => {
  return (
    <Card className="py-2">
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">{nickname}</div>
            <div className="font-light text-gray-500">{email}</div>
          </div>
          <Link>
            <ChevronRightIcon className="w-6 cursor-pointer text-gray-500" />
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
