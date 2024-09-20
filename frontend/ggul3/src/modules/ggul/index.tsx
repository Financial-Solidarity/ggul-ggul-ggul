import React from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid';

import { PageContainer } from '../common/components/Container';
import { TopBar } from '../common/components/TopBar';

export const GGul = () => {
  return (
    <>
      <TopBar
        bgColor=""
        center={<p>껄 메인</p>}
        left={<DefaultTopButton />}
        right={<DefaultTopButton />}
      />
      <PageContainer
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

export const DefaultTopButton = () => {
  const onClick = () => {
    alert('onClicked');
  };

  return (
    <button className="w-full h-full" onClick={onClick}>
      <BeakerIcon />
    </button>
  );
};
