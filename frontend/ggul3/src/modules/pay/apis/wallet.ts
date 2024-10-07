import {
  Pageable,
  PageableOptions,
  TokenTradingHistoryItemDTO,
  WalletDTO,
} from '@types';

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

interface TokenTradingHistoryDTO extends PageableOptions {
  content: TokenTradingHistoryItemDTO[];
  pageable: Pageable;
}

export const getTokenTradingHistories = () => {
  console.log('실행됨');

  return _axios<TokenTradingHistoryDTO>({
    method: 'GET',
    url: `/wallet/token/histories`,
  });
};
