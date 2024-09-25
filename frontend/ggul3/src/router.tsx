import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import { GameMain } from './modules/game/pages/GameMain';
import { GameGame } from './modules/game/pages/GameGame';
import { GameMarket } from './modules/game/pages/GameMarket';
import { GameInventory } from './modules/game/pages/GameInventory';
import { GameLuckyDraw } from './modules/game/pages/GameLuckyDraw';
import LoginPage from './modules/user/pages/LoginPage';
import SignUpPage from './modules/user/pages/SignUpPage';
import FindPasswordPage from './modules/user/pages/FindPasswordPage';
import { AccountBookPage } from './modules/accountBook/pages/AccountBookPage';
import { PayPage } from './modules/pay/pages/PayPage';
import { WalletPage } from './modules/pay/pages/WalletPage';
import { CretaeChallengePage } from './modules/challenge/pages/CreateChallengePage';
import { ChallengeListPage } from './modules/challenge/pages/ChallengeListPage';
import { WaitingRoomPage } from './modules/challenge/pages/WaitingRoomPage';

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
    INVENTORY: Path;
    LUCKYDRAW: Path;
  };
  CHALLENGE: {
    MAIN: Path;
    CREATE: Path;
    WAITING_ROOM: Path;
  };
  GGULPAY: {
    MAIN: Path;
    WALLET: Path;
  };
  ACCOUNTBOOK: Path;
  MYPAGE: Path;
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
  },
  GGULPAY: {
    MAIN: {
      path: '/pay',
      name: '껄페이',
    },
    WALLET: {
      path: '/pay/wallet',
      name: '전자지갑',
    },
  },
  ACCOUNTBOOK: {
    path: '/account-book',
    name: '가계부',
  },
  MYPAGE: {
    path: '/mypage',
    name: '마이페이지',
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

const ChallengeRoutes: RouteObject[] = [
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
];

export const router = createBrowserRouter([
  {
    path: PathNames.HOME.path,
    element: <App />,
    errorElement: <></>,
    children: [
      {
        path: PathNames.GAME.MAIN.path,
        element: <GameMain />,
        children: [
          {
            path: PathNames.GAME.GAME.path,
            element: <GameGame />,
          },
          {
            path: PathNames.GAME.MARKET.path,
            element: <GameMarket />,
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
      {
        path: PathNames.GGULPAY.MAIN.path,
        element: <PayPage />,
      },
      {
        path: PathNames.GGULPAY.WALLET.path,
        element: <WalletPage />,
      },
      {
        path: PathNames.ACCOUNTBOOK.path,
        element: <AccountBookPage />,
      },
      {
        path: PathNames.MYPAGE.path,
        element: <></>,
      },
      ...ChallengeRoutes,
    ],
  },
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
]);
