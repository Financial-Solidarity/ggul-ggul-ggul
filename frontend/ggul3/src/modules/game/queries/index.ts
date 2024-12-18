import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';

import {
  EquipmentDTO,
  GetReceivableTokenResponse,
  GetSellNFTListParams,
  GetSellNFTListResponse,
  MintEquipmentRequest,
  MintEquipmentResponse,
  RegisterSellNFTRequest,
  RegisterSellNFTResponse,
  RemoveEquipmentRequest,
  GetEquippedEquipmentResponse,
  GetEquipmentListResponse,
  GetMarketItemResponse,
} from '../@types';
import {
  getEquipmentList,
  getEquippedEquipment,
  mintEquipment,
  drawEquipment,
  getEquipmentNames,
  removeEquipment,
  equipEquipment,
  unequipEquipment,
  registerSellNFT,
  buyEquipment,
  getMarketItemDetail,
  getSellNFTList,
  cancelMarketSale,
  getReceivableTokenAmount,
  receiveToken,
  getTokenBalance,
} from '../apis';

// 장착된 장비 조회 쿼리 훅
export const useEquippedEquipmentQuery =
  (): UseQueryResult<GetEquippedEquipmentResponse | null> => {
    return useQuery({
      queryKey: ['equippedEquipment'],
      queryFn: async () => {
        // 데이터를 가져오면서 에러를 직접 핸들링
        try {
          return await getEquippedEquipment();
        } catch (error) {
          console.error('장착된 장비 조회 에러:', error);

          return null; // 에러 발생 시 null 반환
        }
      },
      retry: false, // 에러 발생 시 재시도를 비활성화 (필요에 따라 변경 가능)
      staleTime: 1000 * 60 * 5, // 데이터가 얼마나 오래 사용될 수 있는지 설정 (옵션)
    });
  };

// 보유한 장비 리스트 조회 쿼리 훅
export const useEquipmentListQuery = (
  minPower: number,
  maxPower: number,
): UseQueryResult<GetEquipmentListResponse> => {
  return useQuery({
    queryKey: ['equipmentList', minPower, maxPower],
    queryFn: () => getEquipmentList(minPower, maxPower),
  });
};

// 장비 이름 리스트 조회 쿼리 훅
export const useEquipmentNamesQuery = (): UseQueryResult<string[]> => {
  return useQuery({
    queryKey: ['equipmentNames'],
    queryFn: getEquipmentNames,
  });
};

// 장비 NFT 발행 뮤테이션 훅
export const useMintEquipmentMutation = (): UseMutationResult<
  MintEquipmentResponse,
  unknown,
  MintEquipmentRequest
> => {
  return useMutation({
    mutationFn: (request: MintEquipmentRequest) => mintEquipment(request),
  });
};

// 장비 뽑기 뮤테이션 훅
export const useDrawEquipmentMutation = (): UseMutationResult<EquipmentDTO> => {
  return useMutation({
    mutationFn: drawEquipment,
  });
};

// 장비 장착(변경) 뮤테이션 훅
export const useEquipEquipmentMutation = (): UseMutationResult<
  void,
  unknown,
  { ipfsCID: string }
> => {
  return useMutation({
    mutationFn: (request) => equipEquipment(request),
  });
};

// 장비 해제 뮤테이션 훅
export const useUnequipEquipmentMutation = (): UseMutationResult<
  void,
  unknown,
  { ipfsCID: string }
> => {
  return useMutation({
    mutationFn: (request) => unequipEquipment(request),
  });
};

// 장비 삭제 뮤테이션 훅
export const useRemoveEquipmentMutation = (): UseMutationResult<
  void,
  unknown,
  RemoveEquipmentRequest
> => {
  return useMutation({
    mutationFn: (request) => removeEquipment(request),
  });
};

// 판매 글 작성 뮤테이션 훅
export const useRegisterSellNFTMutation = (): UseMutationResult<
  RegisterSellNFTResponse,
  unknown,
  RegisterSellNFTRequest
> => {
  return useMutation({
    mutationFn: (request) => registerSellNFT(request),
  });
};

// 판매 글 구매 뮤테이션 훅
export const useBuyEquipmentMutation = (): UseMutationResult<
  void,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: (marketId) => buyEquipment(marketId),
  });
};

// 판매 글 상세 조회 쿼리 훅
export const useMarketItemDetailQuery = (
  marketId: string,
): UseQueryResult<GetMarketItemResponse> => {
  return useQuery({
    queryKey: ['marketItemDetail', marketId],
    queryFn: () => getMarketItemDetail(marketId),
  });
};

// 판매 글 리스트 조회 쿼리 훅
export const useSellNFTListQuery = (
  params: GetSellNFTListParams,
): UseQueryResult<GetSellNFTListResponse> => {
  return useQuery({
    queryKey: ['sellNFTList', params],
    queryFn: () => getSellNFTList(params),
  });
};

// 판매 글 삭제(취소) 뮤테이션 훅
export const useCancelMarketSaleMutation = (): UseMutationResult<
  void,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: (marketId) => cancelMarketSale(marketId),
  });
};

// 껄 수령 가능 토큰 조회 쿼리 훅
export const useReceivableTokenAmountQuery =
  (): UseQueryResult<GetReceivableTokenResponse> => {
    return useQuery({
      queryKey: ['receivableTokenAmount'],
      queryFn: getReceivableTokenAmount,
    });
  };

// 껄 수령 뮤테이션 훅
export const useReceiveTokenMutation = (): UseMutationResult<
  void,
  unknown,
  void
> => {
  return useMutation({
    mutationFn: () => receiveToken(),
  });
};

// 토큰 밸런스 조회 쿼리 훅
export const useTokenBalanceQuery = (): UseQueryResult<{ balance: number }> => {
  return useQuery({
    queryKey: ['tokenBalance'],
    queryFn: getTokenBalance,
  });
};
