import { useEffect } from 'react';

import { useBottomBarStore } from '../store/useBottomBarStore';

interface UseSetBottomBarParams {
  active?: boolean;
  isDarkMode?: boolean;
}

export const useSetBottomBar = ({
  active,
  isDarkMode,
}: UseSetBottomBarParams) => {
  const setActive = useBottomBarStore((state) => state.setActive);
  const setIsDarkMode = useBottomBarStore((state) => state.setIsDarkMode);

  useEffect(() => {
    if (active !== undefined) {
      setActive(active);
    }
    if (isDarkMode !== undefined) {
      setIsDarkMode(isDarkMode);
    }
  }, [active, isDarkMode, setActive, setIsDarkMode]);
};
