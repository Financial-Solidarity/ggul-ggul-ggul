export const formatUnreadMessageCount = (count: number) => {
  return 300 < count ? '300+' : '' + count;
};
