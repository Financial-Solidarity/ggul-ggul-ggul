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

interface verifyEmail {
  email: string;
  number: string;
}

export const verifyEmail = ({ email, number }: verifyEmail) => {
  return _axios<{ isValid: boolean }>({
    method: 'POST',
    url: `/auth/email/verification`,
    data: { email, number },
  });
};

export const requestEmailVerification = (email: verifyEmail) => {
  return _axios<{ isValid: boolean }>({
    method: 'POST',
    url: `/auth/email/verification-request`,
    data: { email },
  });
};
