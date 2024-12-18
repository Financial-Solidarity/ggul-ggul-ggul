import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

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
  PaymentSuccessPage,
  PayPage,
  PrizeHistoryPage,
  QrCodePage,
  QrPayPage,
  WalletPage,
} from './modules/pay/pages';
import { LoginPage, SignUpPage } from './modules/user/pages';
import {
  AccountBookHistoryPage,
  AccountBookPage,
  AccountBookStatisticsPage,
  ConnectAccountPage,
  NoticeRequireBankAccount,
} from './modules/accountBook/pages';
import { WaitingRoomPage } from './modules/challenge/pages/WaitingRoomPage';
import { ChattingRoomListPage } from './modules/challenge/pages/ChattingRoomListPage';
import { MyPage } from './modules/myPage/pages/MyPage';
import { SoloChattingRoomPage } from './modules/challenge/pages/SoloChattingRoomPage';
import { TeamChattingRoomPage } from './modules/challenge/pages/TeamChattingRoomPage';
import { TotalChattingRoomPage } from './modules/challenge/pages/TotalChattingRoomPage';
import { useUserStore } from './modules/common/store/userStore';
import { ChattingRoomPage } from './modules/challenge/pages/ChattingRoomPage';
import { ChangePasswordPage } from './modules/myPage/pages';
import { useBankAccountStore } from './modules/common/store/useBankAccountStore';
import { LuckyDrawDetailPage } from './modules/pay/pages/LuckyDrawDetailPage';
import { Provider } from './provider';

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
    CHATTING_ROOM: Path;
  };
  GGULPAY: {
    MAIN: Path;
    WALLET: Path;
    PRIZE_HISTORY: Path;
    LUCKY_DRAW_ENTRY: Path;
    QR_PAY: Path;
    LUCKY_DRAW_LIST: Path;
  };
  ACCOUNT_BOOK: {
    MAIN: Path;
    HISTORY: Path;
    STATISTICS: Path;
    QR_CODE: Path;
    CONNECT_ACCOUNT: Path;
    PAYMENT_SUCCESS: Path;
  };
  MYPAGE: {
    MAIN: Path;
    CHANGE_USER_INFO: Path;
  };
  LOGIN: Path;
  SIGNUP: Path;
  CHANGE_PASSWORD: Path;
  NOTICE_REQUIRE_ACCOUNT: Path;
}

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
    CHATTING_ROOM: {
      path: '/challenge/chatting-room',
      name: '채팅방 찾아가는용도',
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
    LUCKY_DRAW_LIST: {
      path: '/pay/lucky-draw/:id',
      name: '응모 상품 목록',
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
    PAYMENT_SUCCESS: {
      path: '/account-book/payment-success',
      name: '결제 성공',
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
  SIGNUP: {
    path: '/signup',
    name: '로그인',
  },
  CHANGE_PASSWORD: {
    path: '/change-password',
    name: '로그인',
  },
  NOTICE_REQUIRE_ACCOUNT: {
    path: '/account-book/require-account',
    name: '계좌 연결 필요 안내',
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
  {
    path: PathNames.CHALLENGE.CHATTING_ROOM.path,
    element: <ChattingRoomPage />,
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
  {
    path: PathNames.ACCOUNT_BOOK.PAYMENT_SUCCESS.path,
    element: <PaymentSuccessPage />,
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
  {
    path: PathNames.GGULPAY.LUCKY_DRAW_LIST.path,
    element: <LuckyDrawDetailPage />,
  },
];

const loginRoutes: RouteObject[] = [
  {
    path: PathNames.LOGIN.path,
    element: <LoginPage />,
  },
  {
    path: PathNames.SIGNUP.path,
    element: <SignUpPage />,
  },
];

const noticeRoutes: RouteObject[] = [
  {
    path: PathNames.NOTICE_REQUIRE_ACCOUNT.path,
    element: <NoticeRequireBankAccount />,
  },
];

const myPageRoutes: RouteObject[] = [
  {
    path: PathNames.MYPAGE.MAIN.path,
    element: <MyPage />,
  },
  {
    path: PathNames.CHANGE_PASSWORD.path,
    element: <ChangePasswordPage />,
  },
];

const homeRoutes: RouteObject[] = [
  {
    path: PathNames.HOME.path,
    element: <MyPage />,
  },
];

const gameRoutes: RouteObject[] = [
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
];

// 비인가 사용자가 접근 가능한 경로
const publicRoutes: RouteObject[] = [...loginRoutes];
const requiredRoutes: RouteObject[] = [...noticeRoutes];
// 인가 된 사용자만 접근 가능한 경로
const privateRoutes: RouteObject[] = [
  ...challengeRoutes,
  ...payRoutes,
  ...accountBook,
  ...myPageRoutes,
  ...homeRoutes,
  ...gameRoutes,
];

export const router = createBrowserRouter([
  {
    path: PathNames.HOME.path,
    element: (
      <Provider>
        <App />
      </Provider>
    ),
    errorElement: <></>,
    children: [
      ...publicRoutes.map((route) => ({
        ...route,
        element: <PublicRoute element={route.element} />,
      })),
      ...requiredRoutes.map((route) => ({
        ...route,
        element: <RequiredRoute element={route.element} />,
      })),
      ...privateRoutes.map((route) => ({
        ...route,
        element: <PrivateRoute element={route.element} />,
      })),
    ],
  },
]);

function PublicRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn } = useUserStore();
  const { bankAccount } = useBankAccountStore();

  if (isLoggedIn) {
    return <Navigate replace to={PathNames.MYPAGE.MAIN.path} />;
  }

  if (isLoggedIn && bankAccount === null) {
    return <Navigate replace to={PathNames.NOTICE_REQUIRE_ACCOUNT.path} />;
  }

  return <>{element}</>;
}

function RequiredRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn, isBankAccountPossessed } = useUserStore();

  const currentPath = window.location.pathname;

  if (!isLoggedIn) {
    return <Navigate replace to={PathNames.LOGIN.path} />;
  }

  if (
    isBankAccountPossessed &&
    currentPath === PathNames.NOTICE_REQUIRE_ACCOUNT.path
  ) {
    return <Navigate replace to={PathNames.MYPAGE.MAIN.path} />;
  }

  return <>{element}</>;
}

function PrivateRoute({ element }: { element: ReactNode }) {
  const { isLoggedIn, isBankAccountPossessed } = useUserStore();

  // 허용할 경로 리스트
  const allowedPaths = [
    PathNames.NOTICE_REQUIRE_ACCOUNT.path,
    PathNames.ACCOUNT_BOOK.CONNECT_ACCOUNT.path,
  ];

  const currentPath = window.location.pathname;

  if (!isLoggedIn) {
    return <Navigate replace to={PathNames.LOGIN.path} />;
  }

  // 계좌 연동이 안된 사용자는 특정 경로에 접근할 수 없음
  if (
    isLoggedIn &&
    !isBankAccountPossessed &&
    !allowedPaths.includes(currentPath)
  ) {
    return <Navigate replace to={PathNames.NOTICE_REQUIRE_ACCOUNT.path} />;
  }

  return <>{element}</>;
}
