import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { useNavigate } from 'react-router-dom';

interface ChangeMainAccountLinkButtonProps {}

export const ChangeMainAccountLinkButton =
  ({}: ChangeMainAccountLinkButtonProps) => {
    const navigate = useNavigate();

    const handleClickChangeAccountButton = () => {
      navigate('/account-book/connect-account');
    };

    return (
      <Card className="bg-slate-200 hover:bg-slate-300">
        <button onClick={handleClickChangeAccountButton}>
          <CardBody>
            <div className="flex justify-between py-2">
              <p className="text-xl font-bold">계좌 변경하기</p>
              <ChevronRightIcon className="w-6 cursor-pointer text-gray-500" />
            </div>
          </CardBody>
        </button>
      </Card>
    );
  };
