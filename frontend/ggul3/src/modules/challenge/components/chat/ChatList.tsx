import { Chat } from '@types';

import { SpendChatBubble } from './SpendChatBubble';
import { JustificationChatBubble } from './JustificationChatBubble';
import { TextChatBubble } from './TextChatBubble';

interface ChatListProps {
  chats: Chat[];
}

export const ChatList = ({ chats }: ChatListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {chats.map((chat) => {
        if (chat.type === 'COMMON') {
          return <TextChatBubble key={chat.chattingId} chat={chat} />;
        }
        if (chat.type === 'JUSTIFICATION') {
          return <JustificationChatBubble key={chat.chattingId} chat={chat} />;
        }

        if (chat.type === 'SPEND') {
          return <SpendChatBubble key={chat.chattingId} chat={chat} />;
        }
      })}
    </div>
  );
};

const dummyChats: Chat[] = [
  {
    type: 'COMMON',
    chattingId: 'chat1',
    content: '안녕하세요! 오늘도 좋은 하루 되세요.',
    sentAt: '2024-09-27T10:00:00Z',
    profile: {
      participantId: 'user1',
      nickname: 'Alice',
      profileImg: 'https://example.com/profile1.jpg',
      type: 'RED',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat2',
    content: '이번 소비는 교육 관련입니다.',
    consumption: { category: '교육', balance: 50000 },
    img: 'https://example.com/image.jpg',
    sentAt: '2024-09-27T10:05:00Z',
    profile: {
      participantId: 'user2',
      nickname: 'Bob',
      profileImg: 'https://example.com/profile2.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat3',
    consumption: { category: '식사', balance: 12000 },
    sentAt: '2024-09-27T10:10:00Z',
    profile: {
      participantId: 'user3',
      nickname: 'Charlie',
      profileImg: 'https://example.com/profile3.jpg',
      type: 'PERSONAL',
      isMine: true,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat4',
    content: '오늘은 날씨가 참 좋네요!',
    sentAt: '2024-09-27T10:15:00Z',
    profile: {
      participantId: 'user4',
      nickname: 'David',
      profileImg: 'https://example.com/profile4.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat5',
    content: '새로 산 노트북입니다.',
    consumption: { category: '전자기기', balance: 1500000 },
    img: 'https://example.com/laptop.jpg',
    sentAt: '2024-09-27T10:20:00Z',
    profile: {
      participantId: 'user5',
      nickname: 'Eve',
      profileImg: 'https://example.com/profile5.jpg',
      type: 'RED',
      isMine: true,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat6',
    consumption: { category: '교통비', balance: 2500 },
    sentAt: '2024-09-27T10:25:00Z',
    profile: {
      participantId: 'user1',
      nickname: 'Alice',
      profileImg: 'https://example.com/profile1.jpg',
      type: 'RED',
      isMine: false,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat7',
    content: '주말에 다같이 여행 가요!',
    sentAt: '2024-09-27T10:30:00Z',
    profile: {
      participantId: 'user2',
      nickname: 'Bob',
      profileImg: 'https://example.com/profile2.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat8',
    content: '점심식사 비용 정산입니다.',
    consumption: { category: '음식', balance: 20000 },
    img: null,
    sentAt: '2024-09-27T10:35:00Z',
    profile: {
      participantId: 'user3',
      nickname: 'Charlie',
      profileImg: 'https://example.com/profile3.jpg',
      type: 'PERSONAL',
      isMine: true,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat9',
    consumption: { category: '쇼핑', balance: 80000 },
    sentAt: '2024-09-27T10:40:00Z',
    profile: {
      participantId: 'user4',
      nickname: 'David',
      profileImg: 'https://example.com/profile4.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat10',
    content: '오늘 저녁 뭐 먹을까요?',
    sentAt: '2024-09-27T10:45:00Z',
    profile: {
      participantId: 'user5',
      nickname: 'Eve',
      profileImg: 'https://example.com/profile5.jpg',
      type: 'RED',
      isMine: true,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat11',
    content: '회의가 10분 늦어질 것 같아요.',
    sentAt: '2024-09-27T10:50:00Z',
    profile: {
      participantId: 'user1',
      nickname: 'Alice',
      profileImg: 'https://example.com/profile1.jpg',
      type: 'RED',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat12',
    content: '운동용품 구매했어요.',
    consumption: { category: '스포츠', balance: 100000 },
    img: 'https://example.com/sports.jpg',
    sentAt: '2024-09-27T10:55:00Z',
    profile: {
      participantId: 'user2',
      nickname: 'Bob',
      profileImg: 'https://example.com/profile2.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat13',
    consumption: { category: '문화생활', balance: 30000 },
    sentAt: '2024-09-27T11:00:00Z',
    profile: {
      participantId: 'user3',
      nickname: 'Charlie',
      profileImg: 'https://example.com/profile3.jpg',
      type: 'PERSONAL',
      isMine: true,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat14',
    content: '다음 주에 같이 산책해요.',
    sentAt: '2024-09-27T11:05:00Z',
    profile: {
      participantId: 'user4',
      nickname: 'David',
      profileImg: 'https://example.com/profile4.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat15',
    content: '회사 관련 출장 비용입니다.',
    consumption: { category: '출장', balance: 200000 },
    img: null,
    sentAt: '2024-09-27T11:10:00Z',
    profile: {
      participantId: 'user5',
      nickname: 'Eve',
      profileImg: 'https://example.com/profile5.jpg',
      type: 'RED',
      isMine: true,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat16',
    consumption: { category: '건강', balance: 60000 },
    sentAt: '2024-09-27T11:15:00Z',
    profile: {
      participantId: 'user1',
      nickname: 'Alice',
      profileImg: 'https://example.com/profile1.jpg',
      type: 'RED',
      isMine: false,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat17',
    content: '오늘은 너무 피곤하네요.',
    sentAt: '2024-09-27T11:20:00Z',
    profile: {
      participantId: 'user2',
      nickname: 'Bob',
      profileImg: 'https://example.com/profile2.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'JUSTIFICATION',
    chattingId: 'chat18',
    content: '가족과 외식했습니다.',
    consumption: { category: '음식', balance: 50000 },
    img: 'https://example.com/food.jpg',
    sentAt: '2024-09-27T11:25:00Z',
    profile: {
      participantId: 'user3',
      nickname: 'Charlie',
      profileImg: 'https://example.com/profile3.jpg',
      type: 'PERSONAL',
      isMine: true,
    },
  },
  {
    type: 'SPEND',
    chattingId: 'chat19',
    consumption: { category: '여가', balance: 40000 },
    sentAt: '2024-09-27T11:30:00Z',
    profile: {
      participantId: 'user4',
      nickname: 'David',
      profileImg: 'https://example.com/profile4.jpg',
      type: 'BLUE',
      isMine: false,
    },
  },
  {
    type: 'COMMON',
    chattingId: 'chat20',
    content: '오늘도 화이팅!',
    sentAt: '2024-09-27T11:35:00Z',
    profile: {
      participantId: 'user5',
      nickname: 'Eve',
      profileImg: 'https://example.com/profile5.jpg',
      type: 'RED',
      isMine: true,
    },
  },
];
