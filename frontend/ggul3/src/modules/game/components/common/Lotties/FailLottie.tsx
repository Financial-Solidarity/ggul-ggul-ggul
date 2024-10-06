import Lottie from 'lottie-react';

import warningAnimation from '@/assets/lotties/lottie_warning.json';

export const FailLottie = () => {
  return (
    <Lottie
      animationData={warningAnimation}
      loop={false}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
