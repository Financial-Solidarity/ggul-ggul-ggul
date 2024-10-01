import { UserSignUpForm } from '@types';
import { create } from 'zustand';

interface signUpState extends UserSignUpForm {
  step: string;
  emailValidation: string;
  passwordCheck: string;
  displayErrorMessage: {
    email: string;
    nickname: string;
    passwordCheck: string;
    emailValidation: string;
  };
  ERRORS: {
    EMAIL: string;
    DUPLICATED_EMAIL: string;
    NICKNAME: string;
    DUPLICATED_NICKNAME: string;
    PASSWORD_CHECK: string;
    EMAIL_VALIDATION: string;
  };
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setEmailValidation: (emailValidation: string) => void;
  setStep: (step: string) => void;
  validateEmail: () => void;
  validatePasswordCheck: () => void;
}

export const useSignUpStore = create<signUpState>((set, get) => ({
  step: 'sign up',
  email: 'khj745700@naver.com',
  nickname: 'test1test1',
  password: 'test1test1',
  passwordCheck: 'test1test1',
  emailValidation: '',
  displayErrorMessage: {
    email: '',
    nickname: '',
    passwordCheck: '',
    emailValidation: '',
  },
  ERRORS: {
    EMAIL: '올바르지 않은 이메일 형식입니다.',
    DUPLICATED_EMAIL: '중복된 이메일입니다.',
    NICKNAME: '중복된 닉네임 입니다.',
    DUPLICATED_NICKNAME: '중복된 닉네임 입니다.',
    PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
    EMAIL_VALIDATION: '인증번호가 일치하지 않습니다.',
  },

  validateEmail: () => {
    const { email } = get();

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      set({
        displayErrorMessage: {
          ...get().displayErrorMessage,
          email: get().ERRORS.EMAIL,
        },
      });
    } else {
      set({
        displayErrorMessage: { ...get().displayErrorMessage, email: '' },
      });
    }
  },

  validatePasswordCheck: () => {
    const password = get().password;
    const passwordCheck = get().passwordCheck;

    if (password && passwordCheck && password !== passwordCheck) {
      set({
        displayErrorMessage: {
          ...get().displayErrorMessage,
          passwordCheck: get().ERRORS.PASSWORD_CHECK,
        },
      });
    } else {
      set({
        displayErrorMessage: {
          ...get().displayErrorMessage,
          passwordCheck: '',
        },
      });
    }
  },

  setEmail: (email: string) => {
    set({ email });
  },

  setNickname: (nickname: string) => {
    set({ nickname });
  },

  setPassword: (password: string) => {
    set({ password });
  },

  setPasswordCheck: (passwordCheck: string) => {
    set({ passwordCheck });
  },

  setStep: (step: string) => {
    set({ step });
  },

  setEmailValidation: (emailValidation: string) => {
    set({ emailValidation });
  },
}));
