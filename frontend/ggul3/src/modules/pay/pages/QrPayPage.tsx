import { useLocation } from 'react-router-dom';

export const QrPayPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryId = queryParams.get('categoryId');
  const productName = queryParams.get('productName');
  const requiredMoney = queryParams.get('requiredMoney');
  const market = queryParams.get('market');

  console.log(categoryId, productName, requiredMoney, market);

  return (
    <div>
      <h1>결제 페이지</h1>
      <p>카테고리 ID: {categoryId}</p>
      <p>상품명: {productName}</p>
      <p>가격: {requiredMoney}</p>
      <p>가게 이름: {market}</p>
    </div>
  );
};
