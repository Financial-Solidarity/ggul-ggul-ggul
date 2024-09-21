import { BeakerIcon } from '@heroicons/react/24/solid';

import { PageContainer } from '../common/components/Layouts/PageContainer';
import { TopBar } from '../common/components/Layouts/TopBar';
import { useSetBottomBar } from '../common/hooks/useSetBottomBar';

export const GGul = () => {
  useSetBottomBar({ active: true, isDarkMode: true });

  return (
    <>
      <TopBar
        bgColor=""
        center={<p>껄 메인</p>}
        left={<ExampleTopButton />}
        right={<ExampleTopButton />}
      />
      <PageContainer
        // bgColor="bg-[#1A1A1A]"
        titleContent={<p className="text-2xl font-semibold">껄 메인</p>}
      >
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
        <p className="text-5xl">ㅋㅋ</p>
      </PageContainer>
    </>
  );
};

//============================

export const ExampleTopButton = () => {
  const onClick = () => {
    alert('onClicked');
  };

  return (
    <button className="h-full w-full" onClick={onClick}>
      <BeakerIcon />
    </button>
  );
};
