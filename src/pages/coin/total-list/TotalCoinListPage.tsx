import { useQuery } from '@tanstack/react-query';
import { getCoins } from '@apis/coinGecko';
import CoinTable from '@common/components/CoinTable';
import { getColumnsData, sortBookmarksByMarketCapRank } from '@lib/utils';
import { useEffect, useState } from 'react';
import { ICoin } from '@common/interface/interface';
import { useGlobalContext } from '@contexts/GlobalContext';
import { CurrencyEnum, PageSizeEnum, ViewTypeEnum } from '@lib/enum';
import { Navigate } from 'react-router-dom';
import LoadingDots from '@common/components/LoadingDots';
import { styled } from 'styled-components';

const TotalCoinListPage = () => {
  const { bookmarks, changeCurrency } = useGlobalContext();
  const [fetchListData, setFetchListData] = useState<ICoin[]>([]);
  const [bookmarkedListData, setBookmarkedListData] = useState<ICoin[]>([]);
  const [viewType, setViewType] = useState(ViewTypeEnum.TOTAL);
  const [currency, setCurrency] = useState(CurrencyEnum.KRW);
  const [pageSize, setPageSize] = useState(PageSizeEnum.FIFTY);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const getQueryKey = () => {
    return ['coins', currency, pageSize, page];
  };
  const getData = () => {
    return getCoins(currency, 'market_cap_desc', pageSize, page, 'en');
  };

  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: getData,
    meta: {
      errorMessage: '코인 목록을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
  });

  useEffect(() => {
    if (viewType == ViewTypeEnum.BOOKMARKS) {
    }
  }, [currency, pageSize]);

  useEffect(() => {
    if (queryResults.data) {
      if (isLoadingMore) {
        setFetchListData((oldData) => [...oldData, ...queryResults.data]);
        setIsLoadingMore(false);
      } else {
        setFetchListData(queryResults.data);
      }
    }
  }, [queryResults.isLoading, queryResults.data]);

  const handleChangeViewType = (event: any) => {
    if (event.target.value == ViewTypeEnum.TOTAL) {
      setViewType(ViewTypeEnum.TOTAL);
      const slicedList = fetchListData.slice(0, pageSize);
      setFetchListData(slicedList);
    } else {
      setViewType(ViewTypeEnum.BOOKMARKS);
      const slicedList = bookmarks.slice(0, pageSize);
      const sorted = sortBookmarksByMarketCapRank(slicedList);
      setBookmarkedListData(sorted);
    }
  };

  const handleChangeCurrency = (event: any) => {
    if (event.target.value == CurrencyEnum.KRW) {
      setCurrency(CurrencyEnum.KRW);
      changeCurrency(CurrencyEnum.KRW);
    } else {
      setCurrency(CurrencyEnum.USD);
      changeCurrency(CurrencyEnum.USD);
    }
    setPage(1);
  };

  const handleChangePageSize = (event: any) => {
    if (event.target.value == PageSizeEnum.TEN) {
      setPageSize(PageSizeEnum.TEN);
    } else if (event.target.value == PageSizeEnum.THIRTY) {
      setPageSize(PageSizeEnum.THIRTY);
    } else {
      setPageSize(PageSizeEnum.FIFTY);
    }
    setPage(1);
    if (viewType == ViewTypeEnum.BOOKMARKS) {
      const slicedList = bookmarks.slice(0, event.target.value);
      const sorted = sortBookmarksByMarketCapRank(slicedList);
      setBookmarkedListData(sorted);
    }
  };

  const handleChangePagination = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  if (queryResults.error) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div>
      {queryResults.isLoading && !isLoadingMore ? (
        <LoadingDots />
      ) : (
        <>
          <DropdownDiv>
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
          </DropdownDiv>
          <CoinTable
            name={'가상자산 시세 목록'}
            data={viewType == ViewTypeEnum.TOTAL ? fetchListData : bookmarkedListData}
            columns={getColumnsData(currency)}
            noDataMessage="Sorry, No coins data available"
          />
          {!isLoadingMore && viewType == ViewTypeEnum.TOTAL && fetchListData.length > 0 && (
            <MoreDiv onClick={handleChangePagination}>+ 더보기</MoreDiv>
          )}
          {isLoadingMore && viewType == ViewTypeEnum.TOTAL && <LoadingDots />}
        </>
      )}
    </div>
  );
};

export default TotalCoinListPage;

const DropdownSelect = styled.select`
  margin-left: 20px;
  height: 40px;
  border: none;
  cursor: pointer;
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

const DropdownDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
