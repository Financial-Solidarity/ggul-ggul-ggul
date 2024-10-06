import { AccountItemDTO } from '@types';

import { _axios } from '@/modules/common/utils/axios';

/**
 * (회원가입 시) 계정과 일치하는 은행 API를 생성합니다.
 * @returns {Promise<void>}
 */
export const createBankApi = () => {
  return _axios({
    method: 'POST',
    url: `account/users`,
  });
};

/**
 * 모든 계좌를 생성합니다.
 * @returns {Promise<void>}
 */
export const createAllBankAccounts = () => {
  return _axios<AccountItemDTO[]>({
    method: 'POST',
    url: `account/demand-deposits/accounts`,
  });
};

/**
 * 모든 계좌를 조회합니다.
 * @returns {Promise<void>}
 */
export const getAllBankAccounts = () => {
  return _axios<AccountItemDTO[]>({
    method: 'GET',
    url: `account/demand-deposits/accounts`,
  });
};

/**
 * 주 계좌를 조회합니다.
 * @returns {Promise<void>}
 */
export const getMainBankAccount = () => {
  return _axios<AccountItemDTO | null>({
    method: 'GET',
    url: `account/demand-deposits/primary`,
  });
};

/**
 * 주 계좌를 변경합니다.
 * @returns {Promise<void>}
 */
export const setMainBankAccount = (accountNo: string) => {
  return _axios({
    method: 'POST',
    url: `/account/demand-deposits/primary`,
    data: { accountNo },
  });
};
