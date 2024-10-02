// import { useState, useEffect, useCallback } from 'react';

// import { useNftSellListQuery } from '../queries/market';
// import { SellNFTDTO } from '../@types/new_index';

// export const useGameMarketData = (pageSize: number) => {
//   const [pageNumber, setPageNumber] = useState(0);
//   const [sellNftList, setSellNftList] = useState<SellNFTDTO[]>([]);
//   const [searchCriteria, setSearchCriteria] = useState<{
//     name?: string;
//     minPrice?: number;
//     maxPrice?: number;
//   }>({});
//   const [totalContentCount, setTotalContentCount] = useState<number | null>(
//     null,
//   );

//   // 판매 리스트 가져오기 쿼리
//   const { data, isFetching } = useNftSellListQuery(
//     pageNumber,
//     pageSize,
//     searchCriteria,
//   );

//   useEffect(() => {
//     if (data?.content) {
//       // 검색 조건이 있을 경우 초기화 후 데이터 교체
//       if (pageNumber === 0) {
//         setSellNftList(data.content);
//       } else {
//         setSellNftList((prevList) => [...prevList, ...data.content]);
//       }
//       setTotalContentCount(data.pagination.totalElements);
//     }
//   }, [data, pageNumber]);

//   const handleObserver = useCallback(
//     (entries: IntersectionObserverEntry[]) => {
//       const target = entries[0];

//       if (
//         target.isIntersecting &&
//         !isFetching &&
//         (totalContentCount === null ||
//           sellNftList.length < totalContentCount)
//       ) {
//         setPageNumber((prevPageNumber) => prevPageNumber + 1);
//       }
//     },
//     [isFetching, totalContentCount, sellNftList.length],
//   );

//   return {
//     sellNftList,
//     isFetching,
//     handleObserver,
//     setSearchCriteria,
//     setSellNftList,
//     setPageNumber,
//   };
// };
