import { UserDTO } from '@types';
import { create } from 'zustand';

export interface UserState {
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
