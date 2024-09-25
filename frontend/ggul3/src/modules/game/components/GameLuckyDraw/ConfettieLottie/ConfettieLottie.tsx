import Lottie from 'lottie-react';

import confettiAnimation from '@/assets/lotties/lottie_confetti.json';

export const ConfettieLottie = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 50 }}>
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        style={{ width: '100%', height: '200px', margin: '0 auto' }}
      />
    </div>
  );
};
