import { useQuery } from "@tanstack/react-query";
import {getCoins} from '@apis/coin-gecko';
import CoinTable from "@common/components/CoinTable";
import { getColumnsData } from "@lib/utils";
import { useEffect, useState } from "react";
import { ICoin } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum, PageSizeEnum, ViewTypeEnum } from "@lib/enum";
import { Navigate } from "react-router-dom";
import LoadingDots from "@common/components/LoadingDots";


const TotalCoinListPage = () => {
  const { bookmarks, changeCurrency } = useGlobalContext()
  const [fetchListData, setFetchListData] = useState<ICoin[]>([])
  const [bookmarkedListData, setBookmarkedListData] = useState<ICoin[]>([])
  const [viewType, setViewType] = useState(ViewTypeEnum.TOTAL)
  const [currency, setCurrency] = useState(CurrencyEnum.KRW)
  const [pageSize, setPageSize] = useState(PageSizeEnum.FIFTY)
  const [page, setPage] = useState(1)
 
  const getQueryKey = () => {
    return ['coins', currency, pageSize, page]
  };
  const getData = () => {
    return viewType === ViewTypeEnum.TOTAL ? getCoins(currency, 'market_cap_desc', pageSize, page,'en') : Promise.resolve(bookmarks)
  };
  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: getData,
    meta: {
      errorMessage: '코인 목록을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
})

  useEffect(() => {
    if (queryResults.data) {
      setFetchListData(queryResults.data)
    }
  }, [queryResults.data])



  useEffect(() => {
    if (queryResults.error) {
      /// TODO: 로직 필요시 추가
      
    }
  }, [queryResults.error])


  useEffect(() => {
    console.log('변경되어야함'+pageSize)
  }, [bookmarkedListData])
  
  
  const handleChangeViewType = (event: any) => {
    if(event.target.value == ViewTypeEnum.TOTAL) {
      setViewType(ViewTypeEnum.TOTAL)
      const slicedList = fetchListData.slice(0, pageSize)
      setFetchListData(slicedList)
      /// TODO: 전체보기 -> 북마크 11개 -> 북마크 보기 -> 아직 pageSize 가 50이니까 11개 다 보임 -> 10개 보기로 변경 -> 북마크 리스트 10개 보임 -> 전체 보기로 변경 -> 아직 pageSize 가 10이니까 10개 보임 
      /// -> 30개 보기로 변경 -> 전체 보기여서 30개가 보여야 하는데 11개가 보이는 문제.
    } else {
      setViewType(ViewTypeEnum.BOOKMARKS)
      setBookmarkedListData(bookmarks)
    }
  };

  const handleChangeCurrency = (event: any) => {
    
    if(event.target.value == CurrencyEnum.KRW) {
      setCurrency(CurrencyEnum.KRW)
      changeCurrency(CurrencyEnum.KRW)
    } else {
      setCurrency(CurrencyEnum.USD)
      changeCurrency(CurrencyEnum.USD)
    }
    setPage(1)
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
    if(viewType == ViewTypeEnum.BOOKMARKS) {
      const slicedList = bookmarks.slice(0, event.target.value);
      setBookmarkedListData(slicedList)
    }
  };

  const handleChangePagination = () => {
    setPageSize(pageSize + pageSize)
    setPage(page + 1)
  }


  if (queryResults.error) {
    return <Navigate to="/error" replace />;
  }
  
  return (
    <div>
    <div>
       <select value={viewType} onChange={handleChangeViewType}>
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
      {queryResults.isLoading ? <LoadingDots/> : <CoinTable name={"가상자산 시세 목록"} data={viewType == ViewTypeEnum.TOTAL ? fetchListData : bookmarkedListData} columns={getColumnsData(currency)} noDataMessage="No coins data available"  />}
      {!queryResults.isLoading && viewType == ViewTypeEnum.TOTAL && <div onClick={() => handleChangePagination()}>+ 더보기</div>}
    </div>
  );
  
};

export default TotalCoinListPage;