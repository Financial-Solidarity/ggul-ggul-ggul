import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';

interface ChangeMainAccountLinkButtonProps {}

export const ChangeMainAccountLinkButton =
  ({}: ChangeMainAccountLinkButtonProps) => {
    return (
      <Card className="hover:bg-gray-200">
        <CardBody>
          <div className="flex justify-between py-2">
            <p className="text-xl font-bold">계좌 변경하기</p>
            <ChevronRightIcon className="w-6 cursor-pointer text-gray-500" />
          </div>
        </CardBody>
      </Card>
    );
  };
