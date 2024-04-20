import { useQuery } from "@tanstack/react-query";
import {fetchCoins} from '@apis/coin-gecko';
import { PAGING_SIZE } from "@static/constant";
import { ICoin } from "@common/interface/interface";
import CoinTable from "@common/components/CoinTable";
import { DUMMY_COIN_DATA } from "@static/dummy";
import BookmarkIcon from "@common/components/BookmarkIcon";
const columns: any = [
  {
    accessorKey: 'name',
    header: '자산',
    cell: (info:any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon toggled={false} />
        {info.getValue()}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'symbol',
    cell: (info:any) => info.getValue(),
    size: 100,
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: (info:any) => `$@₩${info.getValue()}`,
    size: 150,
  },
  {
    accessorKey: 'price_change_percentage_1h_in_currency',
    header: '1H',
    cell: (info: any) => `₩$${info.getValue()}%`,
    size: 150,
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: '24H',
    cell: (info: any) => `${info.getValue()}%`,
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: '7D',
    cell: (info: any) => `${info.getValue()}%`,
    size: 200,
  },
  {
    accessorKey: 'total_volume',
    header: '24H Volume',
    cell: (info: any) => `₩${info.getValue()}`,
    size: 200,
  }
];
const TotalCoinListPage = () => {
  const { data, error, isLoading, isError }  = useQuery({
    queryKey: ['coins'],
    queryFn: () => fetchCoins('krw', 'market_cap_asc', PAGING_SIZE, 1,'en'), refetchOnWindowFocus: false,
  })
  console.log("뭐징..");
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  
  return (
    <>
    <div>가상 화페 목록 페이지</div>
    <div>
      <CoinTable name={"후우우우"} data={DUMMY_COIN_DATA} columns={columns} noDataMessage="No coins data available"
  useMinHeight={true} />
        핑..
    </div>
    </>
  );
  
};

export default TotalCoinListPage;
