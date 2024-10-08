import { UserDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getUserData = () => {
  return _axios<UserDTO>({
    method: 'GET',
    url: `/users/info`,
  });
};

interface EditUser {
  nickname: string;
  nowPassword?: string;
  newPassword?: string;
  isProfileImgRemove?: boolean;
  profileImg?: File | string;
}

export const editUserNickname = ({
  nickname = '',
  nowPassword = '',
  newPassword = '',
  isProfileImgRemove = false,
  profileImg = '',
}: EditUser) => {
  const formData = new FormData();

  formData.append('nickname', nickname);
  if (nowPassword) formData.append('nowPassword', nowPassword);
  if (newPassword) formData.append('newPassword', newPassword);
  formData.append('isProfileImgRemove', String(isProfileImgRemove));

  if (profileImg instanceof File) {
    formData.append('profileImg', profileImg);
  } else if (typeof profileImg === 'string') {
    formData.append(
      'profileImg',
      new Blob([profileImg], { type: 'image/jpeg' }),
    );
  }

  return _axios({
    method: 'PATCH',
    url: `/users/info`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
