import { UserDTO } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  user: UserDTO;
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

      setUser: (user) => set({ user }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
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
