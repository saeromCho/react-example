import { useParams } from "react-router-dom";

const CoinDetailPage = () => {
  const { id } = useParams();
  
  return (
    <>
      <div>코인 상세 페이지</div>
      <div>{id}</div>
    </>
);
};

export default CoinDetailPage;
