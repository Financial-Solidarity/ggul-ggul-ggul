import { UserDTO } from '@types';
import { create } from 'zustand';

export interface UserState {
  user: UserDTO;
  setUser: (user: UserDTO) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 0,
    username: '테스트',
    nickname: '테스트',
    profileImg:
      'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F01920d13-21f2-7f43-aa95-d8addad2c1bejpg',
  },
  setUser: (user) => set({ user }),
}));
