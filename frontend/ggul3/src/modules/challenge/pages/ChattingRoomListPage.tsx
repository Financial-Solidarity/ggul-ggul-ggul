import { ChattingRoomGroupDTO } from '@types';

import { ChattingRoomGroup } from '../components/chattingRoomList/ChattingRoomGroup';

import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
import { TopBar } from '@/modules/common/components/Layouts/TopBar';
import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';

export const ChattingRoomListPage = () => {
  useSetBottomBar({ active: true, isDarkMode: false });

  return (
    <>
      <TopBar />
      <PageContainer>
        <div className="mb-20 flex flex-col gap-4 py-4">
          {mockChattingRoomGroups.map((chattingRoomGroup) => (
            <ChattingRoomGroup
              key={chattingRoomGroup.challengeId}
              {...chattingRoomGroup}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
};

const mockChattingRoomGroups: ChattingRoomGroupDTO[] = [
  {
    challengeId: '1',
    title: 'Fitness Challenge',
    isEncrypted: true,
    competitionType: 'T',
    isBlindness: false,
    limitParticipant: 10,
    currentParticipant: 8,
    budgetCap: '1000',
    startAt: '2024-10-01T09:00:00Z',
    endAt: '2024-12-01T18:00:00Z',
    isOwner: true,
    isEnd: false,
    myTeamChattingRoom: {
      chattingRoomId: 'team1',
      lastChattingContent: 'Let’s go team!',
      lastChattingSentAt: '2024-09-25T10:30:00Z',
      badge: 10,
    },
    lobbyChattingRoom: {
      chattingRoomId: 'lobby1',
      lastChattingContent: 'Welcome everyone!',
      lastChattingSentAt: '2024-09-24T15:45:00Z',
      badge: 2,
    },
    totalChattingRoom: {
      chattingRoomId: 'total1',
      lastChattingContent:
        'Good luck to all teams! Good luck to all teams!Good luck to all teams!Good luck to all teams!Good luck to all teams!Good luck to all teams!Good luck to all teams!',
      lastChattingSentAt: '2024-09-23T09:00:00Z',
      badge: 25,
    },
  },
  {
    challengeId: '2',
    title: 'Reading Marathon',
    isEncrypted: false,
    competitionType: 'S',
    isBlindness: true,
    limitParticipant: 15,
    currentParticipant: 15,
    budgetCap: '500',
    startAt: '2024-09-15T08:00:00Z',
    endAt: '2024-11-15T20:00:00Z',
    isOwner: false,
    isEnd: false,
    myTeamChattingRoom: null,
    lobbyChattingRoom: {
      chattingRoomId: 'lobby2',
      lastChattingContent: 'Ready to read!',
      lastChattingSentAt: '2024-09-20T13:00:00Z',
      badge: 15,
    },
    totalChattingRoom: {
      chattingRoomId: 'total2',
      lastChattingContent: 'How’s everyone doing?',
      lastChattingSentAt: '2024-09-22T10:00:00Z',
      badge: 50,
    },
  },
  {
    challengeId: '3',
    title: 'Coding Bootcamp Challenge',
    isEncrypted: true,
    competitionType: 'T',
    isBlindness: false,
    limitParticipant: 20,
    currentParticipant: 12,
    budgetCap: '1500',
    startAt: '2024-09-30T07:00:00Z',
    endAt: '2024-11-30T22:00:00Z',
    isOwner: true,
    isEnd: false,
    myTeamChattingRoom: {
      chattingRoomId: 'team3',
      lastChattingContent: 'Debugging party at 8!',
      lastChattingSentAt: '2024-09-25T20:00:00Z',
      badge: 30,
    },
    lobbyChattingRoom: {
      chattingRoomId: 'lobby3',
      lastChattingContent: 'Let’s code!',
      lastChattingSentAt: '2024-09-21T17:00:00Z',
      badge: 5,
    },
    totalChattingRoom: {
      chattingRoomId: 'total3',
      lastChattingContent: 'Remember to submit your code!',
      lastChattingSentAt: '2024-09-21T17:00:00Z',
      badge: 301, // Represents 300+
    },
  },
];
