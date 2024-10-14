import { SignUp } from '@types';

import { _axios } from '@/modules/common/utils/axios';

export const checkDuplicatedEmail = (email: string) => {
  return _axios<{ isDuplicated: boolean }>({
    method: 'POST',
    url: `/auth/users/email/duplicate`,
    data: { email },
  });
};

export const checkDuplicatedNickname = (nickname: string) => {
  return _axios<{ isDuplicated: boolean }>({
    method: 'POST',
    url: `/auth/users/nickname/duplicate`,
    data: { nickname },
  });
};

interface VerifyEmail {
  email: string;
  number: string;
}

export const requestEmailVerification = ({ email }: { email: string }) => {
  return _axios<{ isValid: boolean }>({
    method: 'POST',
    url: `/auth/email/verification-request`,
    data: { email },
  });
};

/**
 * 이메일 인증번호를 검증합니다.
 * @param email 이메일
 * @param number 인증번호
 * @returns {Promise<{ isValid: boolean }>}
 */
export const verifyEmail = ({ email, number }: VerifyEmail) => {
  return _axios<{ isValid: boolean }>({
    method: 'POST',
    url: `/auth/email/verification`,
    data: { email, number },
  });
};

export const signUp = ({ email, nickname, password }: SignUp) => {
  return _axios<{ isValid: boolean }>({
    method: 'POST',
    url: `/auth/users`,
    data: { email, nickname, password },
  });
};
