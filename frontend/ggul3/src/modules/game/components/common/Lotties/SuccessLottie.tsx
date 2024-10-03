import Lottie from 'lottie-react';

import successAnimation from '@/assets/lotties/lottie_success.json';

export const SuccessLottie = () => {
  return (
    <Lottie
      loop
      animationData={successAnimation}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
