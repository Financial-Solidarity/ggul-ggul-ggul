import { ChallengeDTO, TextChatBubbleDTO } from '@types';
import { create } from 'zustand';

export interface ChattingRoomState extends ChallengeDTO {
  lobbyChattingRoomId: string | null; // 'uuid'
  chattingRoom: ChallengeDTO;
  chatData: TextChatBubbleDTO[];

  setLobbyChattingRoomId: (lobbyChattingRoomId: string | null) => void;
  setChattingRoom: (chattingRoom: ChallengeDTO) => void;
}

export const useChattingRoomStore = create<ChattingRoomState>((set) => ({
  chattingRoom: {
    challengeId: '',
    title: '',
    isEncrypted: false,
    competitionType: 'S',
    isBlindness: false,
    currentParticipant: 0,
    limitParticipant: 0,
    budgetCap: 0,
    startAt: '',
    endAt: '',
    lobbyChattingRoomId: null,
  },
  chatData: [],

  challengeId: '',
  title: '',
  isEncrypted: false,
  competitionType: 'S',
  isBlindness: false,
  currentParticipant: 0,
  limitParticipant: 0,
  budgetCap: 0,
  startAt: '',
  endAt: '',
  lobbyChattingRoomId: null,

  setLobbyChattingRoomId: (lobbyChattingRoomId) => set({ lobbyChattingRoomId }),
  setChattingRoom: (chattingRoom) => set(chattingRoom),
}));
