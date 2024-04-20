import { useQuery } from "@tanstack/react-query";
import {checkPing, fetchCoins} from '@apis/coin-gecko';

const TotalCoinListPage = () => {
  const { data, error, isLoading, isError }  = useQuery({
    queryKey: ['ping'],
    queryFn: () => checkPing,
  })

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
    <div>가상 화페 목록 페이지</div>
    <div>
    {/* {data && data.map((coin) => (
          <li key={coin.id}>{coin.name} - {coin.current_price}</li>
        ))} */}
        핑..
    </div>
    </>
  );
  
};

export default TotalCoinListPage;
