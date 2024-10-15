import Lottie from 'lottie-react';

import loadingAnimation from '@/assets/lotties/lottie_loading.json';

export const LoadingLottie = () => {
  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
