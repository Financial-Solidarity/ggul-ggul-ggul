// frontend/ggul3/src/modules/common/reactQueries/useNotificationQuery.ts

import { useInfiniteQuery } from '@tanstack/react-query';

import { getNotifications } from '../apis/notificationApis';

export const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
  });
};
