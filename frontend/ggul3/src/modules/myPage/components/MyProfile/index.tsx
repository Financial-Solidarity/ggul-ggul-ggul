import { PencilIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { Button, Input } from '@nextui-org/react';

import { useEditUserStore } from '../../store/editUserStore';

import { useUserStore } from '@/modules/common/store/userStore';
import { editUserNickname } from '@/modules/common/apis/userApis';

export const MyProfile = () => {
  const { isEditing, nicknameInput, setIsEditing, setNicknameInput } =
    useEditUserStore();

  const { user, setUser } = useUserStore();

  const handleClickCancelEditNicknameButton = () => {
    setIsEditing(false);
    setNicknameInput(user.nickname);
  };

  const handleClickEditNicknameConfirmButton = async () => {
    try {
      await editUserNickname({ nickname: nicknameInput });

      setUser({
        ...user,
        nickname: nicknameInput,
      });
      setIsEditing(false);
    } catch (e) {
      console.error('닉네임 변경 실패', e);
    }
  };

  return (
    <Card className="py-2 duration-200 ease-linear hover:bg-gray-200">
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <div className="mr-2">
              <Image
                className="rounded-full"
                height={64}
                src={profileImg}
                width={64}
              />
            </div> */}
            <div>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <Input
                    placeholder="닉네임"
                    size="sm"
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                  />
                  <Button
                    color="primary"
                    size="sm"
                    onClick={handleClickEditNicknameConfirmButton}
                  >
                    닉네임 변경
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleClickCancelEditNicknameButton}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <div className="flex">
                  <div className="text-xl">{user.nickname}</div>
                  <Button
                    isIconOnly
                    className="ml-1 rounded-full hover:bg-gray-500/10"
                    // @ts-ignore
                    color="none"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <PencilIcon className="w-4 cursor-pointer text-gray-500" />
                  </Button>
                </div>
              )}

              <div className="text-sm font-light text-gray-500">
                {user.username}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
