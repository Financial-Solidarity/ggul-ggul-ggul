import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createAllBankAccounts,
  createBankApi,
  getAllBankAccounts,
  getMainBankAccount,
  setMainBankAccount,
} from '../apis/bankApis';

export const useCreateBankApiMutation = () => {
  return useMutation({
    mutationFn: () => createBankApi(),
  });
};

export const useCreateAllBankAccountsMutation = () => {
  return useMutation({
    mutationFn: () => createAllBankAccounts(),
  });
};

export const useGetAllBankAccountsMutation = () => {
  return useQuery({
    queryKey: ['allBankAccounts'],
    queryFn: () => getAllBankAccounts(),
    initialData: [],
  });
};

export const useGetMainBankAccountMutation = () => {
  return useQuery({
    queryKey: ['mainBankAccount'],
    queryFn: () => getMainBankAccount(),
    initialData: null,
  });
};

export const useSetMainBankAccountMutation = () => {
  return useMutation({
    mutationFn: (accountNo: string) => setMainBankAccount(accountNo),
  });
};
