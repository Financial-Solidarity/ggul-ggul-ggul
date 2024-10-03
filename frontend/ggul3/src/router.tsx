import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import { GameMain } from './modules/game/pages/GameMain';
import { GameGame } from './modules/game/pages/GameGame';
import { GameMarket } from './modules/game/pages/GameMarket';
import { GameMarketSellDetail } from './modules/game/pages/GameMarketSellDetail';
import { GameMarketSellCreate } from './modules/game/pages/GameMarketSellCreate';
import { GameInventory } from './modules/game/pages/GameInventory';
import { GameLuckyDraw } from './modules/game/pages/GameLuckyDraw';
import { CretaeChallengePage } from './modules/challenge/pages/CreateChallengePage';
import { ChallengeListPage } from './modules/challenge/pages/ChallengeListPage';
import {
  LuckyDrawEntryPage,
  PayPage,
  PrizeHistoryPage,
  QrCodePage,
  QrPayPage,
  WalletPage,
} from './modules/pay/pages';
import { FindPasswordPage, LoginPage, SignUpPage } from './modules/user/pages';
import {
  AccountBookHistoryPage,
  AccountBookPage,
  AccountBookStatisticsPage,
  ConnectAccountPage,
} from './modules/accountBook/pages';
import { WaitingRoomPage } from './modules/challenge/pages/WaitingRoomPage';
import { ChattingRoomListPage } from './modules/challenge/pages/ChattingRoomListPage';
import { MyPage } from './modules/myPage/pages/MyPage';
import { SoloChattingRoomPage } from './modules/challenge/pages/SoloChattingRoomPage';
import { TeamChattingRoomPage } from './modules/challenge/pages/TeamChattingRoomPage';
import { TotalChattingRoomPage } from './modules/challenge/pages/TotalChattingRoomPage';

export interface Path {
  path: string;
  name: string;
}

export interface PathNames {
  HOME: Path;
  GAME: {
    MAIN: Path;
    GAME: Path;
    MARKET: Path;
    MARKET_DETAIL: Path;
    SELL_CREATE: Path;
    INVENTORY: Path;
    LUCKYDRAW: Path;
  };
  CHALLENGE: {
    MAIN: Path;
    CREATE: Path;
    WAITING_ROOM: Path;
    CHATTING_ROOMS: Path;
    SOLO_CHATTING: Path;
    TEAM_CHATTING: Path;
    TOTAL_CHATTING: Path;
  };
  GGULPAY: {
    MAIN: Path;
    WALLET: Path;
    PRIZE_HISTORY: Path;
    LUCKY_DRAW_ENTRY: Path;
    QR_PAY: Path;
  };
  ACCOUNT_BOOK: {
    MAIN: Path;
    HISTORY: Path;
    STATISTICS: Path;
    QR_CODE: Path;
    CONNECT_ACCOUNT: Path;
  };
  MYPAGE: {
    MAIN: Path;
    CHANGE_USER_INFO: Path;
  };
  LOGIN: Path;
  SIGHUP: Path;
  FIND_PASSWORD: Path;
}

// PathNames 구조화
export const PathNames: PathNames = {
  HOME: {
    path: '/',
    name: '홈',
  },
  GAME: {
    MAIN: {
      path: '/game',
      name: '껄키우기',
    },
    GAME: {
      path: '/game/game',
      name: '게임',
    },
    MARKET: {
      path: '/game/market',
      name: '마켓',
    },
    MARKET_DETAIL: {
      path: '/game/market/:id',
      name: '마켓 디테일',
    },
    SELL_CREATE: {
      path: '/game/market/sell-create',
      name: '판매글 작성',
    },
    INVENTORY: {
      path: '/game/inventory',
      name: '인벤토리',
    },
    LUCKYDRAW: {
      path: '/game/luckydraw',
      name: '럭키드로우',
    },
  },
  CHALLENGE: {
    MAIN: {
      path: '/challenge',
      name: '챌린지',
    },
    CREATE: {
      path: '/challenge/create',
      name: '챌린지만들기',
    },
    WAITING_ROOM: {
      path: '/challenge/waiting-room/:id',
      name: '챌린지 대기실',
    },
    CHATTING_ROOMS: {
      path: '/challenge/chatting-rooms',
      name: '채팅방 목록',
    },
    SOLO_CHATTING: {
      path: '/challenge/solo-chatting/:id',
      name: '개인전 채팅방',
    },
    TEAM_CHATTING: {
      path: '/challenge/team-chatting/:id',
      name: '팀전 팀 채팅방',
    },
    TOTAL_CHATTING: {
      path: '/challenge/total-chatting/:id',
      name: '팀전 전체 채팅방',
    },
  },
  GGULPAY: {
    MAIN: {
      path: '/pay',
      name: '껄 페이',
    },
    WALLET: {
      path: '/pay/wallet',
      name: '전자지갑',
    },
    PRIZE_HISTORY: {
      path: '/pay/prize-history',
      name: '응모 내역',
    },
    LUCKY_DRAW_ENTRY: {
      path: '/pay/lucky-draw',
      name: '응모하기',
    },
    QR_PAY: {
      path: '/pay/qr-pay',
      name: 'QR코드',
    },
  },
  ACCOUNT_BOOK: {
    MAIN: {
      path: '/account-book',
      name: '가계부',
    },
    HISTORY: {
      path: '/account-book/history',
      name: '거래 내역',
    },
    STATISTICS: {
      path: '/account-book/statistics',
      name: '통계',
    },
    QR_CODE: {
      path: '/account-book/qr-code',
      name: 'QR코드',
    },
    CONNECT_ACCOUNT: {
      path: '/account-book/connect-account',
      name: '계좌 연동',
    },
  },
  MYPAGE: {
    MAIN: {
      path: '/mypage',
      name: '마이페이지',
    },
    CHANGE_USER_INFO: {
      path: '/mypage/user/edit',
      name: '회원 정보 수정',
    },
  },
  LOGIN: {
    path: '/login',
    name: '로그인',
  },
  SIGHUP: {
    path: '/signup',
    name: '로그인',
  },
  FIND_PASSWORD: {
    path: '/find-password',
    name: '로그인',
  },
};

const challengeRoutes: RouteObject[] = [
  {
    path: PathNames.CHALLENGE.MAIN.path,
    element: <ChallengeListPage />,
  },
  {
    path: PathNames.CHALLENGE.CREATE.path,
    element: <CretaeChallengePage />,
  },
  {
    path: PathNames.CHALLENGE.WAITING_ROOM.path,
    element: <WaitingRoomPage />,
  },
  {
    path: PathNames.CHALLENGE.CHATTING_ROOMS.path,
    element: <ChattingRoomListPage />,
  },
  {
    path: PathNames.CHALLENGE.SOLO_CHATTING.path,
    element: <SoloChattingRoomPage />,
  },
  {
    path: PathNames.CHALLENGE.TEAM_CHATTING.path,
    element: <TeamChattingRoomPage />,
  },
  {
    path: PathNames.CHALLENGE.TOTAL_CHATTING.path,
    element: <TotalChattingRoomPage />,
  },
];

const accountBook: RouteObject[] = [
  {
    path: PathNames.ACCOUNT_BOOK.MAIN.path,
    element: <AccountBookPage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.STATISTICS.path,
    element: <AccountBookStatisticsPage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.HISTORY.path,
    element: <AccountBookHistoryPage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.QR_CODE.path,
    element: <QrCodePage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.CONNECT_ACCOUNT.path,
    element: <ConnectAccountPage />,
  },
];

const payRoutes: RouteObject[] = [
  {
    path: PathNames.GGULPAY.MAIN.path,
    element: <PayPage />,
  },
  {
    path: PathNames.GGULPAY.WALLET.path,
    element: <WalletPage />,
  },
  {
    path: PathNames.GGULPAY.PRIZE_HISTORY.path,
    element: <PrizeHistoryPage />,
  },
  {
    path: PathNames.GGULPAY.LUCKY_DRAW_ENTRY.path,
    element: <LuckyDrawEntryPage />,
  },
  {
    path: PathNames.GGULPAY.QR_PAY.path,
    element: <QrPayPage />,
  },
];

const loginRoutes: RouteObject[] = [
  {
    path: PathNames.LOGIN.path,
    element: <LoginPage />,
  },
  {
    path: PathNames.SIGHUP.path,
    element: <SignUpPage />,
  },
  {
    path: PathNames.FIND_PASSWORD.path,
    element: <FindPasswordPage />,
  },
];

const myPageRoutes: RouteObject[] = [
  {
    path: PathNames.MYPAGE.MAIN.path,
    element: <MyPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: PathNames.HOME.path,
    element: <App />,
    errorElement: <></>,
    children: [
      {
        children: [
          {
            path: PathNames.GAME.MAIN.path,
            element: <GameMain />,
          },
          {
            path: PathNames.GAME.GAME.path,
            element: <GameGame />,
          },
          {
            path: PathNames.GAME.MARKET.path,
            element: <GameMarket />,
          },
          {
            path: PathNames.GAME.MARKET_DETAIL.path,
            element: <GameMarketSellDetail />,
          },
          {
            path: PathNames.GAME.SELL_CREATE.path,
            element: <GameMarketSellCreate />,
          },
          {
            path: PathNames.GAME.INVENTORY.path,
            element: <GameInventory />,
          },
          {
            path: PathNames.GAME.LUCKYDRAW.path,
            element: <GameLuckyDraw />,
          },
        ],
      },
      ...challengeRoutes,
      ...payRoutes,
      ...loginRoutes,
      ...accountBook,
      ...myPageRoutes,
      {
        path: PathNames.HOME.path,
        element: <MyPage />,
      },
    ],
  },
]);
