import { AccountBookTradingHistoryItem } from '../AccountBookTradingHistoryItem';

export const AccountBookHistory = () => {
  return (
    <div className="bg-red-500-10 flex flex-col gap-4 py-4">
      <AccountBookTradingHistoryItem
        imgUrl="https://via.placeholder.com/36"
        transmissionFrom="KB 국민"
        transmissionTo="케이뱅크"
        value={5000}
      />
      <AccountBookTradingHistoryItem
        ggulDiscount={100}
        imgUrl="https://via.placeholder.com/36"
        transmissionTo="농협하나로마트"
        value={-5000}
      />
      <AccountBookTradingHistoryItem
        imgUrl="https://via.placeholder.com/36"
        transmissionTo="내 NH 농협계좌"
        value={5000}
      />
      <AccountBookTradingHistoryItem
        ggulDiscount={100}
        imgUrl="https://via.placeholder.com/36"
        transmissionTo="CU편의점"
        value={-5000}
      />
      <AccountBookTradingHistoryItem
        imgUrl="https://via.placeholder.com/36"
        transmissionTo="CU편의점"
        value={5000}
      />
      <AccountBookTradingHistoryItem
        ggulDiscount={100}
        imgUrl="https://via.placeholder.com/36"
        transmissionTo="CU편의점"
        value={-5000}
      />
    </div>
  );
};
