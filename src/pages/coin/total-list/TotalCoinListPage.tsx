import { useQuery } from "@tanstack/react-query";
import {fetchCoins} from '@apis/coin-gecko';
import { PAGING_SIZE } from "@static/constant";
import CoinTable from "@common/components/CoinTable";
import { columnsData } from "@lib/utils";

const TotalCoinListPage = () => {
  const { data, error, isLoading, isError }  = useQuery({
    queryKey: ['coins'],
    queryFn: () => fetchCoins('krw', 'market_cap_asc', PAGING_SIZE, 1,'en'), refetchOnWindowFocus: false,
  })
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  
  return (
    <div>
      <CoinTable name={"가상자산 시세 목록"} data={data} columns={columnsData} noDataMessage="No coins data available" useMinHeight={true} />
    </div>
  );
  
};

export default TotalCoinListPage;
