import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { LoginForm, SignUp, VerifyEmail } from '@types';

import { login } from '../apis/login';
import {
  checkDuplicatedEmail,
  checkDuplicatedNickname,
  requestEmailVerification,
  signUp,
  verifyEmail,
} from '../apis/signUp';

export const useLoginMutation = (): UseMutationResult<
  unknown, // 성공했을 때의 반환 타입 (예: 로그인 성공 시 반환되는 데이터 타입)
  unknown, // 에러 타입
  LoginForm // 요청 시 사용할 변수 타입
> => {
  return useMutation({
    mutationFn: (request: LoginForm) => login(request),
  });
};

export const useCheckDuplicatedEmailMutation = (): UseMutationResult<
  { isDuplicated: boolean }, // 성공했을 때의 반환 타입
  unknown, // 에러 타입
  string // 요청 시 사용할 변수 타입 (이메일)
> => {
  return useMutation({
    mutationFn: (email: string) => checkDuplicatedEmail(email),
  });
};

export const useCheckDuplicatedNicknameMutation = (): UseMutationResult<
  { isDuplicated: boolean }, // 성공했을 때의 반환 타입
  unknown, // 에러 타입
  string // 요청 시 사용할 변수 타입 (닉네임)
> => {
  return useMutation({
    mutationFn: (nickname: string) => checkDuplicatedNickname(nickname),
  });
};

export const useRequestEmailVerificationMutation = (): UseMutationResult<
  { isValid: boolean }, // 성공했을 때의 반환 타입
  unknown, // 에러 타입
  { email: string } // 요청 시 사용할 변수 타입 (이메일 객체)
> => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      requestEmailVerification({ email }),
  });
};

export const useVerifyEmailMutation = (): UseMutationResult<
  { isValid: boolean }, // 성공했을 때의 반환 타입
  unknown, // 에러 타입
  VerifyEmail // 요청 시 사용할 변수 타입
> => {
  return useMutation({
    mutationFn: (data: VerifyEmail) => verifyEmail(data),
  });
};

export const useSignUpMutation = (): UseMutationResult<
  { isValid: boolean }, // 성공했을 때의 반환 타입
  unknown, // 에러 타입
  SignUp // 요청 시 사용할 변수 타입
> => {
  return useMutation({
    mutationFn: (data: SignUp) => signUp(data),
  });
};
