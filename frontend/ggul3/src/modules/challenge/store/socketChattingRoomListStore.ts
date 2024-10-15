import { ChattingRoomGroupDTO, SocketChat } from '@types';
import { create } from 'zustand';

interface SocketChattingRoomListState {
  chattingRoomList: ChattingRoomGroupDTO[];
  setChattingRoomList: (chattingRoomList: ChattingRoomGroupDTO[]) => void;
  updateChattingRoom: (chat: SocketChat) => void;
}

export const useSocketChattingRoomListStore =
  create<SocketChattingRoomListState>((set) => ({
    chattingRoomList: [],
    setChattingRoomList: (chattingRoomList: ChattingRoomGroupDTO[]) => {
      set({ chattingRoomList });
    },
    updateChattingRoom: (chat: SocketChat) => {
      set((state) => ({
        chattingRoomList: state.chattingRoomList.map((chattingRoom) => {
          if (chattingRoom.challenge.challengeId === chat.data.challengeId) {
            const newChattingRoom = { ...chattingRoom };

            if (
              newChattingRoom.myTeamChattingRoom &&
              chat.data.chattingRoomId ===
                newChattingRoom.myTeamChattingRoom.chattingRoomId
            ) {
              newChattingRoom.myTeamChattingRoom.badge += 1;
              if (chat.type === 'SPEND') {
                const newContent = `${chat.data.profile.nickname} + "님 소비발생`;

                newChattingRoom.myTeamChattingRoom.lastChattingContent =
                  newContent;
              } else {
                newChattingRoom.myTeamChattingRoom.lastChattingContent =
                  chat.data.content;
              }

              newChattingRoom.myTeamChattingRoom.lastChattingSentAt =
                chat.data.sentAt;
            } else if (
              chat.data.chattingRoomId ===
              newChattingRoom.totalChattingRoom.chattingRoomId
            ) {
              newChattingRoom.totalChattingRoom.badge += 1;
              if (chat.type === 'SPEND') {
                const newContent = `${chat.data.profile.nickname} + "님 소비발생`;

                newChattingRoom.totalChattingRoom.lastChattingContent =
                  newContent;
              } else {
                newChattingRoom.totalChattingRoom.lastChattingContent =
                  chat.data.content;
              }
              newChattingRoom.totalChattingRoom.lastChattingSentAt =
                chat.data.sentAt;
            }

            return newChattingRoom;
          }

          return chattingRoom;
        }),
      }));
    },
  }));
