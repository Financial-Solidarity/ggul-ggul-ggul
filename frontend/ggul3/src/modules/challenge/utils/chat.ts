export const formatUnreadMessageCount = (count) => {
  return 300 < count ? '300+' : '' + count;
};
