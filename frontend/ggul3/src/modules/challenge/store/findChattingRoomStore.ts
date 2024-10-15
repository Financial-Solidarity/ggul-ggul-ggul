import { create } from 'zustand';

interface FindChattingRoomState {
  challengeId: string;
  chattingRoomId: string;
  setChallengeId: (challengeId: string) => void;
  setChattingRoomId: (chattingRoomId: string) => void;
}
export const useFindChattingRoomStore = create<FindChattingRoomState>(
  (set) => ({
    challengeId: '',
    chattingRoomId: '',
    setChallengeId: (challengeId: string) => set({ challengeId }),
    setChattingRoomId: (chattingRoomId: string) => set({ chattingRoomId }),
  }),
);
