import { create } from 'zustand';

interface FindPasswordState {
  step: string;
  email: string;
  emailValidation: string;
  password: string;
  passwordCheck: string;
  displayErrorMessage: {
    email: string;
    passwordCheck: string;
  };
  ERRORS: {
    EMAIL: string;
    PASSWORD_CHECK: string;
  };
  setEmail: (email: string) => void;
  setEmailValidation: (emailValidation: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
  setStep: (step: string) => void;
  validateEmail: () => void;
  validatePasswordCheck: () => void;
}

export const useFindPasswordStore = create<FindPasswordState>((set, get) => ({
  step: 'email',
  email: '',
  password: '',
  passwordCheck: '',
  emailValidation: '',
  displayErrorMessage: {
    email: '',
    passwordCheck: '',
  },
  ERRORS: {
    EMAIL: '올바르지 않은 이메일 형식입니다.',
    PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
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

  setStep: (step: string) => {
    set({ step });
  },

  setPassword: (password: string) => {
    set({ password });
  },

  setPasswordCheck: (passwordCheck: string) => {
    set({ passwordCheck });
  },

  setEmailValidation: (emailValidation: string) => {
    set({ emailValidation });
  },
}));
