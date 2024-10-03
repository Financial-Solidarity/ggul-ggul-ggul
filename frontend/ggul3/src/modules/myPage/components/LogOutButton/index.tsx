import { Card, CardBody } from '@nextui-org/card';

import { useUserStore } from '@/modules/common/store/userStore';

export const LogOutButton = () => {
  const { logout } = useUserStore();

  const handleClickLogOutButton = async () => {
    logout();
  };

  return (
    <Card className="hover:bg-gray-200">
      <button onClick={handleClickLogOutButton}>
        <CardBody>
          <div className="flex justify-between py-2">
            <p className="text-gray-500">로그아웃</p>
          </div>
        </CardBody>
      </button>
    </Card>
  );
};
