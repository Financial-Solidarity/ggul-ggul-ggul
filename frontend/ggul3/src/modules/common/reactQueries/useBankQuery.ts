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
  });
};

export const useGetMainBankAccountMutation = () => {
  return useQuery({
    queryKey: ['mainBankAccount'],
    queryFn: () => getMainBankAccount(),
  });
};

export const useSetMainBankAccountMutation = () => {
  return useMutation({
    mutationFn: (accountNo: string) => setMainBankAccount(accountNo),
  });
};
