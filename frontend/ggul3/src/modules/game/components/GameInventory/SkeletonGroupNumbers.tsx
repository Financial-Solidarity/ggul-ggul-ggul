import { Skeleton } from '@nextui-org/react';

export const SkeletonGroupNumbers = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="rounded-lg bg-default-600">
      <div className="h-8 w-32 rounded-lg" />
    </Skeleton>
    <Skeleton className="rounded-full bg-default-600">
      <div className="h-32 w-32 rounded-full" />
    </Skeleton>
    <Skeleton className="rounded-lg bg-default-600">
      <div className="h-10 w-32 rounded-lg" />
    </Skeleton>
  </div>
);
