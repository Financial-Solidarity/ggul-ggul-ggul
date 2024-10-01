// import { useLocation } from 'react-router-dom';
// import { Button, Image } from '@nextui-org/react';

// import { FoodNftInfo } from '../components/common/FoodNftInfo';

// import { PageContainer } from '@/modules/common/components/Layouts/PageContainer';
// import { BackButton } from '@/modules/common/components/BackButton/BackButton';
// import { useSetBottomBar } from '@/modules/common/hooks/useSetBottomBar';
// import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';

// export const GameMarketSellDetail = (): JSX.Element => {
//   const location = useLocation();
//   const { foodNft } = location.state || {};

//   useSetBottomBar({ active: true, isDarkMode: true });

//   return (
//     <>
//       <PageContainer activePaddingX={false} bgColor="bg-black">
//         {/* 상단 영역 */}
//         <div className="relative h-1/2 bg-gradient-to-br from-purple-400 to-purple-800 p-4">
//           {/* 원형 BackButton */}
//           <BackButton circular />

//           <FoodNftInfo foodNft={foodNft} showTitle={false} />
//         </div>

//         {/* 하단 영역 */}
//         <div className="relative flex h-1/2 flex-col rounded-t-3xl bg-black px-4 py-6">
//           {/* 판매자 프로필 정보 */}
//           <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-center text-default-400">
//             <div className="USER-AVATAR flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-300">
//               <Image
//                 alt="seller avatar"
//                 className="rounded-full object-cover"
//                 fallbackSrc="/placeholder-avatar.png"
//                 height={64}
//                 src={foodNft.sellerAvatar}
//                 width={64}
//               />
//             </div>
//             <p className="text-lg font-semibold">
//               {foodNft.sellerName || '판매자 이름'}
//             </p>
//           </div>
//           <div className="CREATED_AT absolute right-4">
//             <p className="text-sm text-default-400">
//               {formatToRelativeTime(foodNft.createdAt) || '등록일'}
//             </p>
//           </div>

//           {/* 아이템 설명 */}
//           <div className="mt-20 flex justify-between">
//             <div className="flex w-2/3 flex-col gap-1">
//               <p className="text-lg font-semibold text-white">
//                 {foodNft.title || '만화고기 팜여'}
//               </p>
//               <p className="font-light text-default-400">
//                 {foodNft.description || '만화고기 싸게팝니다!'}
//               </p>
//             </div>

//             <div className="flex w-1/3 flex-col gap-3">
//               <div className="GGUL-PRICE ml-auto flex flex-row items-center justify-center gap-2 text-default-400">
//                 <div className="GGUL-ICON flex h-5 w-5 items-center justify-center rounded-full bg-default-400 text-sm font-bold text-black">
//                   ㄲ
//                 </div>
//                 {foodNft.price || '100'} 껄
//               </div>
//             </div>
//           </div>

//           {/* 토큰 정보 및 구매 버튼 */}
//           <div className="mt-auto">
//             {/* 내 껄 토큰 정보 (임시로 nnn껄 표시) */}
//             <div className="mb-2 text-center text-sm text-primary-300">
//               내 껄 토큰 nnn껄
//             </div>

//             {/* NFT 구매 버튼 */}
//             <Button className="h-12 w-full bg-primary-600 text-white">
//               NFT 구매하기
//             </Button>
//           </div>
//         </div>
//       </PageContainer>
//     </>
//   );
// };

export const GameMarketSellDetail = (): JSX.Element => {
  return <></>;
};
