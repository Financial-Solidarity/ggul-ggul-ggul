import { Skeleton } from '@nextui-org/react';

interface SkeletonCardsProps {
  count: number;
}

export const SkeletonCards = ({ count }: SkeletonCardsProps) =>
  Array.from({ length: count }).map((_, index) => (
    <Skeleton key={index} className="h-24 w-24 rounded-lg bg-default-600" />
  ));
