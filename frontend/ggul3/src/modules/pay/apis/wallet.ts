import { WalletDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const getMyWallet = () => {
  return _axios<WalletDTO>({
    method: 'GET',
    url: `/wallet`,
  });
};

export const getMyGgulToken = () => {
  return _axios<{ balance: number }>({
    method: 'GET',
    url: `/wallet/token`,
  });
};
