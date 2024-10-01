// frontend/ggul3/src/modules/game/components/GameLuckyDraw/RandomNumber.tsx
import React, { useEffect, useRef } from 'react';

import { useLuckyDrawStore } from '@/modules/game/store/useLuckyDrawStore';

export const RandomNumber = () => {
  const ELEMENTS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const boxRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const { step, status } = useLuckyDrawStore();

  const SCROLL_DURATION = 1.5;

  const startScroll = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.style.transition = `transform ${SCROLL_DURATION}s linear`;
      ref.current.style.transform = `translateY(-${ref.current.scrollHeight / 2}px)`;
    }
  };

  const stopScroll = (
    ref: React.RefObject<HTMLDivElement>,
    targetNumber: number,
  ) => {
    if (ref.current) {
      const elementHeight = ref.current.scrollHeight / ELEMENTS.length;
      const targetPosition = targetNumber * elementHeight;

      ref.current.style.transition = `transform 1s ease-in-out`;
      ref.current.style.transform = `translateY(-${targetPosition}px)`;
    }
  };

  const resetScroll = () => {
    boxRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = 'none';
        ref.current.style.transform = `translateY(0px)`;
      }
    });
  };

  useEffect(() => {
    if (step === 'init') {
      resetScroll();
    } else if (step === 'drawing') {
      boxRefs.forEach((ref) => startScroll(ref));
    } else if (step === 'drawed' && status !== null) {
      const digits = String(status).padStart(3, '0').split('').map(Number);

      boxRefs.forEach((ref, index) => {
        setTimeout(() => stopScroll(ref, digits[index]), index * 200);
      });
    }
  }, [step, status]);

  return (
    <div className="flex w-52 flex-row justify-end gap-4">
      <div className="flex items-center justify-center gap-2">
        {boxRefs.map((ref, index) => (
          <div
            key={index}
            className="BOX relative h-12 w-8 overflow-hidden rounded-md bg-primary-300 p-3"
          >
            <div ref={ref} className="absolute flex flex-col items-center">
              {ELEMENTS.map((item, idx) => (
                <div key={idx} className="h-10">
                  <p className="text-xl font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="flex items-center justify-center text-xl font-semibold text-white">
        맛도리
      </p>
    </div>
  );
};
