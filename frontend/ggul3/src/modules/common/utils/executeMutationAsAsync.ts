export const executeMutationAsAsync = async <T, R>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateFn: (data: T, options?: any) => void,
  data?: T,
): Promise<R> => {
  return new Promise<R>((resolve, reject) => {
    mutateFn(data as T, {
      onSuccess: resolve,
      onError: reject,
    });
  });
};
