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

import { GroupNumberWithBox } from './GroupNumberWithBox';

import { EquipmentNFTDTO } from '@/modules/game/@types/new_index';

interface EquipmentNftInfoProps {
  equipmentNft?: EquipmentNFTDTO;
  showTitle?: boolean;
  showNumber?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // size prop 추가
}

// 각 사이즈별 크기 매핑
const sizeClasses = {
  xs: { circle: 'h-16 w-16', image: 60 },
  sm: { circle: 'h-20 w-20', image: 80 },
  md: { circle: 'h-28 w-28', image: 135 },
  lg: { circle: 'h-36 w-36', image: 160 },
  xl: { circle: 'h-44 w-44', image: 200 },
};

// grade별 hexCode 매핑
const gradeHexCodes = {
  0: '#FFD700', // 매우 희귀 (금색)
  1: '#C0C0C0', // 희귀 (은색)
  2: '#CD7F32', // 보통 (청동색)
  3: '#4682B4', // 흔함 (파란색)
  4: '#708090', // 매우 흔함 (회색)
};

export const EquipmentNftInfo = ({
  equipmentNft,
  showTitle = true,
  showNumber = true,
  size = 'md', // 디폴트는 md
}: EquipmentNftInfoProps) => {
  const { circle, image } = sizeClasses[size];

  // grade에 따른 hexCode 선택
  const hexCode = gradeHexCodes[equipmentNft?.equipment.grade || 0];

  return (
    <div className="flex flex-col items-center">
      {/* 타이틀 영역 */}
      {showTitle && (
        <p
          className="text-center text-2xl font-semibold"
          style={{ color: hexCode }}
        >
          {equipmentNft?.equipment.name}
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
      {showNumber && <GroupNumberWithBox number={12} />}
    </div>
  );
};
