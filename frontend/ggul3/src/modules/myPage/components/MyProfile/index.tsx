import { PencilIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { Button, Image, Input } from '@nextui-org/react';
import { UserDTO } from '@types';
import { useRef } from 'react';

import { useEditUserStore } from '../../store/editUserStore';

import { useUserStore } from '@/modules/common/store/userStore';
import { editUserNickname, getUserData } from '@/modules/common/apis/userApis';
import ggul3_logo_none_bg from '@/assets/images/ggul3-logo-none-bg.png';

export const MyProfile = () => {
  const { isEditing, nicknameInput, setIsEditing, setNicknameInput } =
    useEditUserStore();

  const { user, setUser } = useUserStore();

  const handleClickOpenEditNicknameButton = () => {
    setIsEditing(true);
    setNicknameInput(user.nickname);
  };

  const handleClickCancelEditNicknameButton = () => {
    setIsEditing(false);
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
            <div className="mr-2">
              <EditProfileImage setUser={setUser} user={user} />
            </div>
            <EditNickname
              handleClickCancelEditNicknameButton={
                handleClickCancelEditNicknameButton
              }
              handleClickEditNicknameConfirmButton={
                handleClickEditNicknameConfirmButton
              }
              handleClickOpenEditNicknameButton={
                handleClickOpenEditNicknameButton
              }
              isEditing={isEditing}
              nicknameInput={nicknameInput}
              setNicknameInput={setNicknameInput}
              user={user}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface EditNicknameProps {
  isEditing: boolean;
  nicknameInput: string;
  setNicknameInput: (value: string) => void;
  handleClickOpenEditNicknameButton: () => void;
  handleClickCancelEditNicknameButton: () => void;
  handleClickEditNicknameConfirmButton: () => void;
  user: UserDTO;
}

const EditNickname = ({
  isEditing,
  nicknameInput,
  setNicknameInput,
  handleClickOpenEditNicknameButton,
  handleClickCancelEditNicknameButton,
  handleClickEditNicknameConfirmButton,
  user,
}: EditNicknameProps) => {
  return (
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
          <Button size="sm" onClick={handleClickCancelEditNicknameButton}>
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
            onClick={handleClickOpenEditNicknameButton}
          >
            <PencilIcon className="w-4 cursor-pointer text-gray-500" />
          </Button>
        </div>
      )}

      <div className="text-sm font-light text-gray-500">{user.username}</div>
    </div>
  );
};

interface EditProfileImageProps {
  user: UserDTO;
  setUser: (user: UserDTO) => void;
}

const EditProfileImage = ({ user, setUser }: EditProfileImageProps) => {
  console.log('user:', user);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소 클릭 트리거
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // 파일을 처리하는 로직을 추가합니다.
      // 예: 업로드 API 호출, 이미지 미리보기 등

      await editUserNickname({ profileImg: file });
      const newUserData = await getUserData();

      setUser({
        ...newUserData,
      });
    }
  };

  return (
    <div className="relative">
      <Image
        className="cursor-pointer rounded-full border-2 border-transparent object-contain hover:border-primary-500"
        height={64}
        src={user.profileImg ? user.profileImg : ggul3_logo_none_bg}
        width={64}
        onClick={handleImageClick} // 이미지 클릭 시 핸들러 호출
      />
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }} // 파일 입력 요소 숨김
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
