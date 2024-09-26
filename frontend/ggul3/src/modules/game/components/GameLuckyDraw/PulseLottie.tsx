import Lottie from 'lottie-react';

import pulseAnimation from '@/assets/lotties/lottie_pulse.json';

export const PulseLottie = () => {
  return (
    <div className="absolute z-30">
      <Lottie animationData={pulseAnimation} style={{ height: '400px' }} />
    </div>
  );
};
