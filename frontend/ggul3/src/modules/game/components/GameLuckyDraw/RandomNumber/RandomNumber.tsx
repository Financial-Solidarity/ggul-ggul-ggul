// import React, { useEffect, useRef } from 'react';

// export const RandomNumber = ({}) => {
//   const ELEMENTS = [
//     '0',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '0',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//   ];
//   const SCROLL_DURATION = 1.5; // 애니메이션이 한 바퀴 도는 시간(초)
//   const boxRefs = [
//     useRef<HTMLDivElement>(null),
//     useRef<HTMLDivElement>(null),
//     useRef<HTMLDivElement>(null),
//   ];

//   const startInfiniteScroll = (ref: React.RefObject<HTMLDivElement>) => {
//     if (ref.current) {
//       ref.current.style.transition = `transform ${SCROLL_DURATION}s linear`;
//       ref.current.style.transform = `translateY(-${ref.current.scrollHeight / 2}px)`;
//     }
//   };

//   const resetScrollPosition = (ref: React.RefObject<HTMLDivElement>) => {
//     if (ref.current) {
//       ref.current.style.transition = 'none';
//       ref.current.style.transform = 'translateY(0)';
//       setTimeout(() => startInfiniteScroll(ref), 10); // 다시 스크롤 시작
//     }
//   };

//   const handleStart = () => {
//     boxRefs.forEach((ref, index) => {
//       setTimeout(() => {
//         startInfiniteScroll(ref);
//         setInterval(() => resetScrollPosition(ref), SCROLL_DURATION * 1000); // 한 바퀴 도는 시간마다 리셋
//       }, index * 0); // 작은 시간 간격을 두고 돌아가도록 설정
//     });
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex items-center justify-center gap-2">
//         {/* 3개의 무한 스크롤 박스 */}
//         {boxRefs.map((ref, index) => (
//           <div
//             key={index}
//             className="BOX relative h-12 w-8 overflow-hidden rounded-md bg-primary-300 p-3"
//           >
//             <div
//               ref={ref}
//               className="absolute flex flex-col items-center gap-2"
//               style={{ transform: 'translateY(0)' }}
//             >
//               {ELEMENTS.map((item: string, idx) => (
//                 <p key={idx} className="text-xl font-bold text-white">
//                   {item}
//                 </p>
//               ))}
//             </div>
//           </div>
//         ))}
//         <p className="text-md ml-3 font-semibold text-white"> 맛도리</p>
//       </div>

//       {/* 버튼: 스크롤 시작 */}
//       {/* <button
//         onClick={handleStart}
//         className="mt-4 rounded-md bg-white px-4 py-2 text-primary-500"
//       >
//         숫자 뽑기
//       </button> */}
//     </div>
//   );
// };

import React, { useEffect, useRef } from 'react';

import { useLuckyDrawStore } from '@/modules/game/store/useLuckyDrawStore';

export const RandomNumber = () => {
  const ELEMENTS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const boxRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const { step, status } = useLuckyDrawStore(); // 상태 가져오기

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

  useEffect(() => {
    if (step === 'drawing') {
      boxRefs.forEach((ref) => startScroll(ref));
    }

    if (step === 'drawed' && status !== null) {
      const digits = String(status).padStart(3, '0').split('').map(Number);

      boxRefs.forEach((ref, index) => {
        setTimeout(() => stopScroll(ref, digits[index]), index * 200);
      });
    }
  }, [step, status]);

  return (
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
  );
};
