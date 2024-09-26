import { TextChatBubble } from './TextChatBubble';

export const ChatList = () => {
  return (
    <div className="flex flex-col gap-2">
      {mockChatData.map((chat, idx) => (
        <TextChatBubble key={idx} {...chat} />
      ))}
    </div>
  );
};

const mockChatData = [
  {
    chattingId: 1,
    nickname: 'Alice',
    content: "Hey, how's it going?",
    sentAt: '오전 8:45',
    isMine: false,
  },
  {
    chattingId: 2,
    nickname: 'Bob',
    content: 'All good here, thanks! What about you?',
    sentAt: '오전 8:46',
    isMine: true,
  },
  {
    chattingId: 3,
    nickname: 'Charlie',
    content: 'Is anyone up for a quick call?',
    sentAt: '오전 9:15',
    isMine: false,
  },
  {
    chattingId: 4,
    nickname: 'Alice',
    content: "Maybe later, I'm a bit busy now.",
    sentAt: '오전 9:17',
    isMine: false,
  },
  {
    chattingId: 5,
    nickname: 'David',
    content: "I'll be free in an hour!",
    sentAt: '오전 9:20',
    isMine: true,
  },
  {
    chattingId: 6,
    nickname: 'Emma',
    content: 'Can you guys check the document I sent?',
    sentAt: '오전 9:45',
    isMine: false,
  },
  {
    chattingId: 7,
    nickname: 'Alice',
    content: 'Just reviewed it. Looks good!',
    sentAt: '오전 10:05',
    isMine: false,
  },
  {
    chattingId: 8,
    nickname: 'Bob',
    content: 'I left some comments in the doc.',
    sentAt: '오전 10:10',
    isMine: true,
  },
  {
    chattingId: 9,
    nickname: 'Charlie',
    content: "Got it, I'll address those soon.",
    sentAt: '오전 10:12',
    isMine: false,
  },
  {
    chattingId: 10,
    nickname: 'Emma',
    content: 'Anyone want to grab lunch later?',
    sentAt: '오전 11:30',
    isMine: false,
  },
  {
    chattingId: 11,
    nickname: 'David',
    content: 'Sounds good! Where to?',
    sentAt: '오전 11:35',
    isMine: true,
  },
  {
    chattingId: 12,
    nickname: 'Alice',
    content: 'How about the new sushi place?',
    sentAt: '오전 11:40',
    isMine: false,
  },
  {
    chattingId: 13,
    nickname: 'Charlie',
    content: "Perfect! I've been wanting to try it.",
    sentAt: '오후 12:00',
    isMine: false,
  },
  {
    chattingId: 14,
    nickname: 'Emma',
    content: 'See you all there at 12:30?',
    sentAt: '오후 12:10',
    isMine: false,
  },
  {
    chattingId: 15,
    nickname: 'Bob',
    content: 'Sure thing! See you then.',
    sentAt: '오후 12:15',
    isMine: true,
  },
  {
    chattingId: 16,
    nickname: 'Alice',
    content: 'Just finished the meeting, free now.',
    sentAt: '오후 1:45',
    isMine: false,
  },
  {
    chattingId: 17,
    nickname: 'David',
    content: "Great timing, let's catch up.",
    sentAt: '오후 2:00',
    isMine: true,
  },
  {
    chattingId: 18,
    nickname: 'Charlie',
    content: "I'll be a little late, stuck in traffic.",
    sentAt: '오후 2:05',
    isMine: false,
  },
  {
    chattingId: 19,
    nickname: 'Emma',
    content: "No worries, we'll wait.",
    sentAt: '오후 2:10',
    isMine: false,
  },
  {
    chattingId: 20,
    nickname: 'Bob',
    content: 'Just arrived! Where are you all?',
    sentAt: '오후 2:20',
    isMine: true,
  },
];
