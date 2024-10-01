interface SlideBarProps {
  itemInfo: {
    categoryId: number;
    productName: string;
    requiredMoney: number;
    market: string;
  };
}

export const ItemInfo = ({ itemInfo }: SlideBarProps) => {
  const { productName, requiredMoney, market } = itemInfo;

  return (
    <div className="flex flex-col gap-1 text-center">
      <p className="text-sm font-light">{market}</p>
      <p className="text-2xl font-bold">{requiredMoney}</p>
      <p className="text-xl font-medium">{productName}</p>
      {/* 바를 오른쪽으로 슬라이드해서 이동하면 결제되는 페이지 만들어 */}
    </div>
  );
};
