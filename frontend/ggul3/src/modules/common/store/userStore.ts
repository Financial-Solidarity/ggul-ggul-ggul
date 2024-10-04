import { UserDTO } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  user: UserDTO; // user를 null을 허용하도록 타입 수정
  setUser: (user: UserDTO) => void;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        userId: '',
        username: '',
        nickname: '',
        profileImg: '',
      },
      isLoggedIn: false,
      setUser: (user) => {
        console.log('set 실행');

        set({ user });
      },
      setIsLoggedIn: (isLoggedIn) => {
        set({ isLoggedIn });
      },

      logout: () =>
        set({
          user: {
            userId: '',
            username: '',
            nickname: '',
            profileImg: '',
          },
          isLoggedIn: false,
        }), // user를 null로 설정하여 로그아웃 처리
    }),
    {
      name: 'session', // storage의 키 이름
    },
  ),
);
