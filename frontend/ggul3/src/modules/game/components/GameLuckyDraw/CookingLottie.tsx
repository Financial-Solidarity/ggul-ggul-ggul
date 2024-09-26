import Lottie from 'lottie-react';

import cookingAnimation from '@/assets/lotties/lottie_cook_1.json';

export const CookingLottie = () => {
  return (
    <div className="w-1/2">
      <Lottie
        animationData={cookingAnimation}
        className="animate-popIn"
        style={{ height: '200px' }}
      />
    </div>
  );
};
