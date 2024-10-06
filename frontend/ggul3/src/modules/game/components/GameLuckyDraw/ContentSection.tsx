import { useNavigate } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

import { MintedEquipmentCard } from './MintedFoodCard';
import { CookingLottie } from './Lotties/CookingLottie';
import { EquipmentInfoDisplay } from './EquipmentInfoDisplay';
import { RandomNumber } from './RandomNumber';

import ServingLid from '@/assets/images/serving_lid.png';
import {
  EquipmentDTO,
  EquipmentNFTDTO,
  HexCodesByGrade,
} from '@/modules/game/@types';

export interface ContentSectionProps {
  step: string;
  equipment: EquipmentDTO | null;
  nft: EquipmentNFTDTO | null; // 추가
  navigate: ReturnType<typeof useNavigate>;
}

export const ContentSection = ({
  step,
  equipment,
  nft,
  navigate,
}: ContentSectionProps) => {
  const hexCode = equipment ? HexCodesByGrade[equipment.grade] : '#FFFFFF';

  return (
    <div className="CONTENT-SECTION flex h-3/5 w-full flex-col items-center justify-center">
      <div className="EQUIPMENT-BOX relative mt-24 flex h-full w-full flex-col items-center">
        {step === 'init' && <Image src={ServingLid} width={180} />}
        {step === 'minted' && nft && (
          <>
            <MintedEquipmentCard
              equipment={nft.equipment}
              onCardClick={() => {}}
            />
            <div className="absolute right-10 top-3">
              <Button
                fullWidth
                as="a"
                className="mt-4 animate-popIn bg-secondary-600 font-semibold text-black"
                href={nft.nftUrl}
                rel="noopener noreferrer"
                target="_blank"
                variant="flat"
              >
                NFT 확인
              </Button>
            </div>
          </>
        )}
        {step === 'drawing' && <CookingLottie />}
        {(step === 'drawed' || step === 'minting') && (
          <EquipmentInfoDisplay equipment={equipment} step={step} />
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            {step !== 'minted' && <RandomNumber />}
          </div>
        </div>

        {step === 'drawed' && (
          <div className="TRANSACTION-LOG absolute -bottom-16 left-1/2 flex w-2/3 -translate-x-1/2 items-center justify-center">
            <Button
              fullWidth
              as="a"
              className="mt-4 animate-popIn bg-secondary-600 text-black"
              href={equipment?.transactionUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="flat"
            >
              뽑기 기록 보러가기
            </Button>
          </div>
        )}

        <div className="PROCESS-INFO absolute -bottom-16 left-1/2 flex w-full -translate-x-1/2 items-center justify-center">
          {(step === 'minting' || step === 'minted') && (
            <>
              {step === 'minting' && (
                <div
                  className={`animate-fadeIn text-center text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: hexCode,
                    }}
                  >
                    {`${equipment?.adjective} ${equipment?.name}`}
                  </span>
                  를<p className="text-center">조리하고 있어요.</p>
                </div>
              )}
              {step === 'minted' && (
                <div
                  className={`animate-fadeIn text-center text-2xl font-semibold text-white`}
                >
                  <span
                    style={{
                      color: hexCode,
                    }}
                  >
                    {`${equipment?.adjective} ${equipment?.name}`}
                  </span>
                  가<p className="text-center">조리되었어요.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
