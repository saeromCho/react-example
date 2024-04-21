import { useQuery } from "@tanstack/react-query";
import {getCoins} from '@apis/coin-gecko';
import CoinTable from "@common/components/CoinTable";
import { getColumnsData, sortedBookmarksByMarketCapRank } from "@lib/utils";
import { useEffect, useState } from "react";
import { ICoin } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum, PageSizeEnum, ViewTypeEnum } from "@lib/enum";
import { Navigate } from "react-router-dom";
import LoadingDots from "@common/components/LoadingDots";
import { styled } from "styled-components";


const TotalCoinListPage = () => {
  const { bookmarks, changeCurrency } = useGlobalContext()
  const [fetchListData, setFetchListData] = useState<ICoin[]>([])
  const [bookmarkedListData, setBookmarkedListData] = useState<ICoin[]>([])
  const [viewType, setViewType] = useState(ViewTypeEnum.TOTAL)
  const [currency, setCurrency] = useState(CurrencyEnum.KRW)
  const [pageSize, setPageSize] = useState(PageSizeEnum.FIFTY)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
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
})

useEffect(() => {
  if (!queryResults.isLoading && queryResults.data) {
    if (isLoadingMore) {
      setFetchListData(oldData => [...oldData, ...queryResults.data])
      setIsLoadingMore(false);  // 로딩 상태 해제
    } else {
      setFetchListData(queryResults.data)
    }
  }
}, [queryResults.isLoading, queryResults.data])


  const handleChangeViewType = (event: any) => {
    if(event.target.value == ViewTypeEnum.TOTAL) {
      setViewType(ViewTypeEnum.TOTAL)
      console.log('원래 있었던 데이터 개수' + fetchListData.length)
      const slicedList = fetchListData.slice(0, pageSize)
      console.log('페이지개수대로 자른 개수' + slicedList.length)
      setFetchListData(slicedList)
      /// TODO: 전체보기 -> 북마크 11개 -> 북마크 보기 -> 아직 pageSize 가 50이니까 11개 다 보임 -> 10개 보기로 변경 -> 북마크 리스트 10개 보임 -> 전체 보기로 변경 -> 아직 pageSize 가 10이니까 10개 보임 
      /// -> 30개 보기로 변경 -> 전체 보기여서 30개가 보여야 하는데 11개가 보이는 문제. 왜 북마크 리스트를 참조하는 거지..?
      // 페이지 네이션시 불러올 데이터만 붙여지게끔하기. 전체 렌더되면 안됨.
    } else {
      setViewType(ViewTypeEnum.BOOKMARKS)
      const sorted = sortedBookmarksByMarketCapRank(bookmarks)
      setBookmarkedListData(sorted)
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
      const slicedList = bookmarks.slice(0, event.target.value)
      const sorted = sortedBookmarksByMarketCapRank(slicedList)
      setBookmarkedListData(sorted)
    }
  };

  const handleChangePagination = () => {
    setIsLoadingMore(true);
    setPage(prev => prev+1)
  }

  
  if (queryResults.error) {
    return <Navigate to="/error" replace />;
  }
  
  return (
    <div>
    {queryResults.isLoading && !isLoadingMore ? <LoadingDots /> :
      <>
           <div style ={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: '40px', paddingTop: '20px', paddingBottom: '20px'}}>
          <DropdownSelect value={viewType} onChange={handleChangeViewType}>
            <option value={ViewTypeEnum.TOTAL}>전체 보기</option>
            <option value={ViewTypeEnum.BOOKMARKS}>북마크 보기</option>
          </DropdownSelect>
          <DropdownSelect value={currency} onChange={handleChangeCurrency}>
            <option value={CurrencyEnum.KRW}>KRW 보기</option>
            <option value={CurrencyEnum.USD}>USD 보기</option>
          </DropdownSelect>
          <DropdownSelect value={pageSize} onChange={handleChangePageSize}>
            <option value={PageSizeEnum.TEN}>10개 보기</option>
            <option value={PageSizeEnum.THIRTY}>30개 보기</option>
            <option value={PageSizeEnum.FIFTY}>50개 보기</option>
          </DropdownSelect>
        </div>
        <CoinTable name={"가상자산 시세 목록"} data={viewType == ViewTypeEnum.TOTAL ? fetchListData : bookmarkedListData}  columns={getColumnsData(currency)}  noDataMessage="Sorry, No coins data available"  />
        {!isLoadingMore && <MoreDiv onClick={handleChangePagination}>+ 더보기</MoreDiv>}
        {isLoadingMore && <LoadingDots isFitted={true}/>}
      </>
    }
  </div>
  );
  
};

export default TotalCoinListPage;

const DropdownSelect = styled.select`
margin-left: 20px;
height: 40px;
border: none;
curosor: pointer;
`;

const MoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
`;