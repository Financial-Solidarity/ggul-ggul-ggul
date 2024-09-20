import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { GGul } from './modules/ggul';

export interface IPath {
  path: string;
  name: string;
}

export interface IPathNames {
  [key: string]: IPath;
}

export const PathNames: IPathNames = {
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
    path: '/ggulpay',
    name: '챌린지',
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
        path: '/',
        element: <GGul />,
      },
    ],
  },
  {
    path: '/Login',
    element: <></>,
    errorElement: <></>,
    children: [],
  },
  {
    path: '/ggulpay',
    element: <></>,
    errorElement: <></>,
    children: [],
  },
]);
