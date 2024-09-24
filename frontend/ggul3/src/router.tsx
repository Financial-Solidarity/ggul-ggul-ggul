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
import { PayPage } from './modules/pay/pages/PayPage';
import { WalletPage } from './modules/pay/pages/WalletPage';
import { CretaeChallengePage } from './modules/challenge/pages/CreateChallengePage';
import PrizeHistory from './modules/pay/components/PrizeHistory';

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
  };
  GGULPAY: {
    MAIN: Path;
    WALLET: Path;
    PRIZE_HISTORY: Path;
  };
  ACCOUNT_BOOK: {
    MAIN: Path;
    HISTORY: Path;
    STATISTICS: Path;
  };
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
    PRIZE_HISTORY: {
      path: '/pay/prize-history',
      name: '전자지갑',
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

const challengeRoutes: RouteObject[] = [
  {
    path: PathNames.CHALLENGE.CREATE.path,
    element: <CretaeChallengePage />,
  },
];

const accountBook: RouteObject[] = [
  {
    path: PathNames.ACCOUNT_BOOK.MAIN.path,
    element: <PayPage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.STATISTICS.path,
    element: <PayPage />,
  },
  {
    path: PathNames.ACCOUNT_BOOK.HISTORY.path,
    element: <PayPage />,
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
    element: <PrizeHistory />,
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
        path: PathNames.MYPAGE.path,
        element: <></>,
      },
      ...challengeRoutes,
      ...payRoutes,
      ...loginRoutes,
      ...accountBook,
    ],
  },
]);
