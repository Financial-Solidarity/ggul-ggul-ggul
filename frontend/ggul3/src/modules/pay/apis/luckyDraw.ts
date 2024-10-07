import {
  LuckyDrawDetailDTO,
  LuckyDrawItemDTO,
  Pageable,
  PageableOptions,
} from '@types';

import { _axios } from '@/modules/common/utils/axios';

interface LuckyDrawList extends PageableOptions {
  content: LuckyDrawItemDTO[];
  pageable: Pageable;
}

export const getLuckyDrawList = () => {
  return _axios<LuckyDrawList>({
    method: 'GET',
    url: `/applications`,
  });
};

export const getLuckyDrawDetail = (applicationId: number) => {
  return _axios<LuckyDrawDetailDTO>({
    method: 'GET',
    url: `/applications/${applicationId}`,
  });
};

export interface LuckyDrawDTO {
  transactionHash: string;
  transactionUrl: string;
  player: string;
  nonce: number;
  target: number;
  isSuccess: boolean;
  remainingWinnerCount: number;
}

export const luckyDraw = (applicationId: number) => {
  return _axios<LuckyDrawDTO>({
    method: 'POST',
    url: `/applications/${applicationId}/apply`,
  });
};
