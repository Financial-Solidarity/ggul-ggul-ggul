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
 * (회원가입 시) 모든 계좌를 조회합니다.
 * @returns {Promise<void>}
 */
export const getAllBankAccounts = () => {
  return _axios({
    method: 'POST',
    url: `account/demand-deposits/accounts`,
  });
};
