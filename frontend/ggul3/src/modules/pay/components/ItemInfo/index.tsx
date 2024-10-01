interface SlideBarProps {
  itemInfo: {
    categoryId: number;
    productName: string;
    requiredMoney: number;
    market: string;
  };
}

export const ItemInfo = ({ itemInfo }: SlideBarProps) => {
  const { categoryId, productName, requiredMoney, market } = itemInfo;

  return (
    <div>
      <h1>결제 페이지</h1>
      <p>카테고리 ID: {categoryId}</p>
      <p>상품명: {productName}</p>
      <p>가격: {requiredMoney}</p>
      <p>가게 이름: {market}</p>
      {/* 바를 오른쪽으로 슬라이드해서 이동하면 결제되는 페이지 만들어 */}
    </div>
  );
};
