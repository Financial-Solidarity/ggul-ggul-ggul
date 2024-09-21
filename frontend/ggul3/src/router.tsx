import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { GGul } from './modules/ggul';

export interface Path {
  path: string;
  name: string;
}

export interface PathNames {
  [key: string]: Path;
}

export const PathNames: PathNames = {
  HOME: {
    path: '/',
    name: '홈',
  },
  GAME: {
    path: '/game',
    name: '껄키우기',
  },
  CHALLENGE: {
    path: '/challenge',
    name: '챌린지',
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <></>,
    children: [
      {
        index: true,
        element: <GGul />,
      },
      {
        path: PathNames.GAME.path,
        element: <GGul />,
      },
      {
        path: PathNames.CHALLENGE.path,
        element: <GGul />,
      },
      {
        path: PathNames.GGULPAY.path,
        element: <GGul />,
      },
      {
        path: PathNames.ACCOUNTBOOK.path,
        element: <GGul />,
      },
      {
        path: PathNames.MYPAGE.path,
        element: <GGul />,
      },
    ],
  },
  {
    path: '/login',
    element: <></>,
    errorElement: <></>,
  },
  {
    path: '/signup',
    element: <GGul />,
    errorElement: <></>,
  },
]);
