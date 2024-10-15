import { Image } from '@nextui-org/react';

import ggul3LogoNoneBg from '@/assets/images/ggul3-logo-none-bg.png';

export const UserLogo = () => {
  return (
    <h1 className="mb-10 text-center text-6xl font-black text-primary">
      <div className="flex">
        <Image height={100} src={ggul3LogoNoneBg} width={200} />
      </div>
    </h1>
  );
};
