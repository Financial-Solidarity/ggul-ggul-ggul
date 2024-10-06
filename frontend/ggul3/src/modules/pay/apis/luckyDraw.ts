import { LuckyDrawItemDTO, Pageable, PageableOptions } from '@types';

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
