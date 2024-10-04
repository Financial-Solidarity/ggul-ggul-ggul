import Lottie from 'lottie-react';

import nothingAnimation from '@/assets/lotties/lottie_nothing.json';

export const NothingLottie = () => {
  return (
    <Lottie
      animationData={nothingAnimation}
      loop={true}
      style={{ width: '100%', height: '250px' }}
    />
  );
};
