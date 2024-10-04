import { UserDTO } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { PathNames } from '@/router';

export interface UserState {
  user: UserDTO;
  isLoggedIn: boolean;
  setUser: (user: UserDTO) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
  redirectUnauthorizedUserToLogin: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        userId: '',
        username: '',
        nickname: '',
        profileImg: '',
      },
      isLoggedIn: false,

      // 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
      redirectUnauthorizedUserToLogin: () => {
        if (!get().isLoggedIn) {
          window.alert('로그인이 필요한 접근 경로입니다.');
          window.location.replace(PathNames.LOGIN.path);
        }
      },

      // 유저 정보 설정
      setUser: (user) => set({ user }),

      // 로그인 여부 설정
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

      // 로그아웃
      logout: () =>
        set({
          user: {
            userId: '',
            username: '',
            nickname: '',
            profileImg: '',
          },
          isLoggedIn: false,
        }),
    }),
    {
      name: 'session', // storage의 키 이름
    },
  ),
);
