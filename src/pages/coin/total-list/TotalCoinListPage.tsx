import { useQuery } from "@tanstack/react-query";
import {fetchCoins} from '@apis/coin-gecko';
import CoinTable from "@common/components/CoinTable";
import { getColumnsData } from "@lib/utils";
import { useEffect, useState } from "react";
import { ICoin } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum, PageSizeEnum, ViewTypeEnum } from "@lib/enum";


const TotalCoinListPage = () => {
  const { bookmarks, changeCurrency } = useGlobalContext();
  const [listData, setListData] = useState<ICoin[]>([]);
  const [viewType, setViewType] = useState(ViewTypeEnum.TOTAL);
  const [currency, setCurrency] = useState(CurrencyEnum.KRW);
  const [pageSize, setPageSize] = useState(PageSizeEnum.FIFTY);
  const [page, setPage] = useState(1);
 
  const getQueryKey = () => {
    return ['coins', currency, pageSize, page];
  };
  const fetchData = () => {
    return viewType === ViewTypeEnum.TOTAL ? fetchCoins(currency, 'market_cap_desc', pageSize, page,'en') : Promise.resolve(bookmarks);
  };
  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: fetchData,
    meta: {
      errorMessage: '코인 목록을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
});

  useEffect(() => {
    if (queryResults.data) {
      setListData(queryResults.data);
    }
  }, [queryResults.data]);

  const handleChangeIsShowAll = (event: any) => {
    if(event.target.value == ViewTypeEnum.TOTAL) {
      setViewType(ViewTypeEnum.TOTAL)
    } else {
      setViewType(ViewTypeEnum.BOOKMARKS)
      setListData(bookmarks);
    }
  };

  const handleChangeCurrency = (event: any) => {
    console.log(event.target.value);
    if(event.target.value == CurrencyEnum.KRW) {
      setCurrency(CurrencyEnum.KRW)
      changeCurrency(CurrencyEnum.KRW)
    } else {
      setCurrency(CurrencyEnum.USD)
      changeCurrency(CurrencyEnum.USD)
    }
    setPage(1);
  };

  const handleChangePageSize = (event: any) => {
    if(event.target.value == PageSizeEnum.TEN) {
      setPageSize(PageSizeEnum.TEN)
    } else if(event.target.value == PageSizeEnum.THIRTY){
      setPageSize(PageSizeEnum.THIRTY)
    } else {
      setPageSize(PageSizeEnum.FIFTY)
    }
    setPage(1);
  };

  const handleChangePagination = () => {
    setPageSize(pageSize + pageSize);
    setPage(page + 1);
  }


  if (queryResults.isError) return <div>Error: {queryResults.error.message}</div>;

  
  return (
    <div>
    <div>
       <select value={viewType} onChange={handleChangeIsShowAll}>
        <option value={ViewTypeEnum.TOTAL}>전체 보기</option>
        <option value={ViewTypeEnum.BOOKMARKS}>북마크 보기</option>
      </select>
       <select value={currency} onChange={handleChangeCurrency}>
        <option value={CurrencyEnum.KRW}>KRW 보기</option>
        <option value={CurrencyEnum.USD}>USD 보기</option>
      </select>
      <select value={pageSize} onChange={handleChangePageSize}>
        <option value={PageSizeEnum.TEN}>10개 보기</option>
        <option value={PageSizeEnum.THIRTY}>30개 보기</option>
        <option value={PageSizeEnum.FIFTY}>50개 보기</option>
      </select>
      </div>
      {queryResults.isLoading ? <div>Loading...</div> : <CoinTable name={"가상자산 시세 목록"} data={listData} columns={getColumnsData(currency)} noDataMessage="No coins data available" useMinHeight={true} />}
      {!queryResults.isLoading && <div onClick={() => handleChangePagination()}>+ 더보기</div>}
    </div>
  );
  
};

export default TotalCoinListPage;