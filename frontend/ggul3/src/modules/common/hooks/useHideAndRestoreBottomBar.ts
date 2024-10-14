import { useEffect } from 'react';

import { useBottomBarStore } from '../store/useBottomBarStore';

/**
 * BottomBar를 숨기고 복원하는 Hook
 */
export const useHideAndRestoreBottomBar = () => {
  const { setActive } = useBottomBarStore();

  useEffect(() => {
    setActive(false);

    return () => {
      setActive(true);
    };
  }, []);
};
