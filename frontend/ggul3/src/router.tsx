import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import { GameMain } from './modules/game/pages/GameMain';
import { GameGame } from './modules/game/pages/GameGame';
import { GameMarket } from './modules/game/pages/GameMarket';
import { GameInventory } from './modules/game/pages/GameInventory';
import { GameLuckyDraw } from './modules/game/pages/GameLuckyDraw';
import { CretaeChallengePage } from './modules/challenge/pages/CreateChallengePage';
import { ChallengeListPage } from './modules/challenge/pages/ChallengeListPage';

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
  GGULPAY: Path;
  ACCOUNTBOOK: Path;
  MYPAGE: Path;
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
    path: '/pay',
    name: '껄페이',
  },
  ACCOUNTBOOK: {
    path: '/accountbook',
    name: '가계부',
  },
  MYPAGE: {
    path: '/mypage',
    name: '마이페이지',
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
        path: PathNames.GGULPAY.path,
        element: <></>,
      },
      {
        path: PathNames.ACCOUNTBOOK.path,
        element: <></>,
      },
      {
        path: PathNames.MYPAGE.path,
        element: <></>,
      },
      ...ChallengeRoutes,
    ],
  },
  {
    path: '/login',
    element: <></>,
    errorElement: <></>,
  },
  {
    path: '/signup',
    element: <></>,
    errorElement: <></>,
  },
]);
