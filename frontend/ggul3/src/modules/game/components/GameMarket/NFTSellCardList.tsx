// import { Card, CardBody, Button } from '@nextui-org/react';
// import { useNavigate } from 'react-router-dom';

// import { FoodNftInfo } from '../common/FoodNftInfo';

// import { FoodNftSellDTO } from '@/modules/game/@types/equipment';
// import { PathNames } from '@/router';
// import { formatToRelativeTime } from '@/modules/common/utils/dateUtils';

// interface NFTSellCardListProps {
//   nftList: FoodNftSellDTO[];
// }

// export const NFTSellCardList: React.FC<NFTSellCardListProps> = ({
//   nftList,
// }) => {
//   const navigate = useNavigate();

//   const handleDetailClick = (foodNft: FoodNftSellDTO) => {
//     navigate(
//       `${PathNames.GAME.MARKET_DETAIL.path.replace(':id', foodNft.tokenId)}`,
//       { state: { foodNft } }, // 글 정보를 state로 전달
//     );
//   };

//   return (
//     <div className="mt-6 grid grid-cols-1 gap-4">
//       {nftList.length === 0 ? (
//         <p className="text-center text-white">텅</p>
//       ) : (
//         nftList.map((foodNft) => (
//           <Card
//             key={foodNft.tokenId}
//             isHoverable
//             className="relative bg-gradient-to-tr from-primary-500 to-primary-900 py-2 text-white"
//           >
//             <CardBody>
//               <p className="font-semibold">{foodNft.name}</p>
//               <div className="mt-2 flex items-center justify-between">
//                 <span>껄 {foodNft.price}</span>
//                 <span>{formatToRelativeTime(foodNft.createdAt)}</span>
//               </div>
//               <FoodNftInfo
//                 foodNft={foodNft}
//                 showNumber={false}
//                 showTitle={false}
//                 size="xl"
//               />
//               <Button
//                 className="absolute bottom-1 right-4 z-20 mt-4 h-12 w-44 rounded-full bg-default-500/20 font-semibold text-white shadow-lg backdrop-blur-md backdrop-saturate-150"
//                 onClick={() => handleDetailClick(foodNft)}
//               >
//                 NFT 음식 판매글 보기
//               </Button>
//             </CardBody>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };
