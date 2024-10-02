import { UserDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getUserData = () => {
  return _axios<UserDTO>({
    method: 'GET',
    url: `/users/info`,
  });
};
