import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

interface MyProfileProps {
  nickname: string;
  email: string;
  profileImg: string;
}

export const MyProfile = ({ nickname, email, profileImg }: MyProfileProps) => {
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate('/mypage/user/edit');
  };

  return (
    <Card className="py-2">
      <button onClick={handleClickProfile}>
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2">
                <Image
                  className="rounded-full"
                  height={64}
                  src={profileImg}
                  width={64}
                />
              </div>
              <div>
                <div className="text-xl font-bold">{nickname}</div>
                <div className="font-light text-gray-500">{email}</div>
              </div>
            </div>
            <ChevronRightIcon className="w-6 cursor-pointer text-gray-500" />
          </div>
        </CardBody>
      </button>
    </Card>
  );
};
