// import { Image } from '@nextui-org/react';

// import { GroupNumberWithBox } from './GroupNumberWithBox';

// import { FoodNftDTO } from '@/modules/game/@types/equipment';

// interface FoodNftInfoProps {
//   foodNft?: FoodNftDTO;
//   showTitle?: boolean;
//   showNumber?: boolean;
//   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // size prop 추가
// }

// // 각 사이즈별 크기 매핑
// const sizeClasses = {
//   xs: { circle: 'h-16 w-16', image: 60 },
//   sm: { circle: 'h-20 w-20', image: 80 },
//   md: { circle: 'h-28 w-28', image: 135 },
//   lg: { circle: 'h-36 w-36', image: 160 },
//   xl: { circle: 'h-44 w-44', image: 200 },
// };

// export const FoodNftInfo = ({
//   foodNft,
//   showTitle = true,
//   showNumber = true,
//   size = 'md', // 디폴트는 md
// }: FoodNftInfoProps) => {
//   const { circle, image } = sizeClasses[size];

//   return (
//     <div className="flex flex-col items-center">
//       {/* 타이틀 영역 */}
//       {showTitle && (
//         <p
//           className="text-center text-2xl font-semibold"
//           style={{ color: foodNft?.hexCode }}
//         >
//           {foodNft?.name}
//         </p>
//       )}

//       {/* 이미지 영역 */}
//       <div
//         className={`relative flex h-44 items-center justify-center ${circle}`}
//       >
//         <div
//           className={`animate-popIn rounded-full ${circle}`}
//           style={{ backgroundColor: foodNft?.hexCode }}
//         />
//         <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
//           <Image
//             className="animate-floating"
//             src={'/src/assets/images/food/food_' + foodNft?.typeIndex + '.png'}
//             width={image}
//           />
//         </div>
//       </div>

//       {/* 숫자 영역 */}
//       {showNumber && <GroupNumberWithBox number={12} />}
//     </div>
//   );
// };

import { Image } from '@nextui-org/react';

import { EquipmentNFTDTO, HexCodesByGrade } from '../../@types';

import { GroupNumberWithBox } from './GroupNumberWithBox';

interface EquipmentNftInfoProps {
  equipmentNft?: EquipmentNFTDTO;
  showTitle?: boolean;
  showNumber?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// 각 사이즈별 크기 매핑
const sizeClasses = {
  xs: { circle: 'h-16 w-16', image: 60 },
  sm: { circle: 'h-20 w-20', image: 80 },
  md: { circle: 'h-28 w-28', image: 135 },
  lg: { circle: 'h-36 w-36', image: 160 },
  xl: { circle: 'h-44 w-44', image: 200 },
};

export const EquipmentNftInfo = ({
  equipmentNft,
  showTitle = true,
  showNumber = true,
  size = 'md', // 디폴트는 md
}: EquipmentNftInfoProps) => {
  const { circle, image } = sizeClasses[size];

  // grade에 따른 hexCode 선택
  const hexCode = HexCodesByGrade[equipmentNft?.equipment.grade || 0];

  return (
    <div className="flex flex-col items-center">
      {/* 타이틀 영역 */}
      {showTitle && (
        <p
          className="text-center text-2xl font-semibold"
          style={{ color: hexCode }}
        >
          {`${equipmentNft?.equipment.adjective} ${equipmentNft?.equipment.name}`}
        </p>
      )}

      {/* 이미지 영역 */}
      <div
        className={`relative flex h-44 items-center justify-center ${circle}`}
      >
        <div
          className={`animate-popIn rounded-full ${circle}`}
          style={{ backgroundColor: hexCode }}
        />
        <div className="IMAGE-WRAPPER absolute flex animate-fadeIn items-center justify-center">
          <Image
            className="animate-floating"
            src={equipmentNft?.equipment.imageUrl}
            width={image}
          />
        </div>
      </div>

      {/* 숫자 영역 */}
      {showNumber && (
        <GroupNumberWithBox number={equipmentNft?.equipment.power} />
      )}
    </div>
  );
};
