import { create } from 'zustand';

interface LoginState {
  isEditing: boolean;
  nicknameInput: string;
  displayErrorMessage: {
    nicknameInput: string;
  };
  ERRORS: {
    EMAIL: string;
  };
  setIsEditing: (isEditing: boolean) => void;
  setNicknameInput: (nicknameInput: string) => void;
}

export const useEditUserStore = create<LoginState>((set, get) => ({
  isEditing: false,
  nicknameInput: '',
  displayErrorMessage: {
    nicknameInput: '',
  },
  ERRORS: {
    EMAIL: '올바르지 않은 이메일 형식입니다.',
  },

  setIsEditing: (isEditing: boolean) => {
    set({ isEditing });
  },
  setNicknameInput: (nicknameInput: string) => {
    set({ nicknameInput });
  },
}));
