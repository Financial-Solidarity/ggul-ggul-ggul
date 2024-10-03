import { UserDTO } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  user: UserDTO | null; // user를 null을 허용하도록 타입 수정
  setUser: (user: UserDTO) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: -1,
        userId: '로그인이필요userID',
        username: '로그인이필요@test.com',
        nickname: '로그인이필요nickname',
        profileImg:
          'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F01920d13-21f2-7f43-aa95-d8addad2c1bejpg',
      },
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }), // user를 null로 설정하여 로그아웃 처리
    }),
    {
      name: 'session', // storage의 키 이름
      getStorage: () => sessionStorage, // sessionStorage 사용
    },
  ),
);
