import { useQuery } from '@tanstack/react-query';
import { getCoins } from '@apis/coinGecko';
import CoinTable from '@common/components/CoinTable';
import { getColumnsData, sortBookmarksByMarketCapRank } from '@lib/utils';
import { useCallback, useEffect, useState } from 'react';
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
    /// TODO: 여기에 'coins' 는 안 넣어도 됐는데 넣었네.. 후... 더블체킹 좀 할 걸..
    return ['coins', currency, pageSize, page];
  };
  const getData = () => {
    /// TODO: market_cap_desc 를 API 명세에 맞게 Enum 값으로 관리하거나 contant 로 뺄 걸 그랬다.
    /// TODO: 'en' 도 마찬가지로 Enum 값으로 관리하거나 내가 만들어둔 locale context API 변수를 사용할 걸 그랬다. 지금 보이네.
    return getCoins(currency, 'market_cap_desc', pageSize, page, 'en');
  };

  /// TODO: 여기서는 동일한 드랍다운 눌렀을 때 API 호출하는지 확인해보고,(=> 확인 결과, 호출안함.)호출한다면 useCallback 을 쓰는 게 맞는 거 같음. 근데 useEffect 내 의존성 배열에 담겨있는 변수 자체가 변경되지 않으면 API 호출을 안하기 때문에 useCallback 을 안해도 상관없을 거 같기도 하고..?
  /// TODO: useCallback 사용해서 이렇게 해도 됐는데 위에꺼 처럼 했네.. CoinDetailPage 에서는 useCallback 써서 구현했는데 여기서는 이렇게 왜 쳐 했냐; 했지만 이미 useEffect 에서 저 세개에 대해서만 호출되게끔 해서 문제는 없고 동일할 거 같긴 한데, 두 페이지에서 쓰이는 코드의 통일성 측면에서 조금 맞지 않음..
  // const getData = useCallback(
  //   () => getCoins(currency, 'market_cap_desc', pageSize, page, 'en'),
  //   [currency, pageSize, page],
  // );

  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: getData,
    meta: {
      errorMessage: '코인 목록을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
  });

  /// TODO: 이 코드 필요없는 코드인데 왜 있냐;;
  useEffect(() => {
    if (viewType == ViewTypeEnum.BOOKMARKS) {
    }
  }, [currency, pageSize]);

  useEffect(() => {
    if (!queryResults.isLoading && queryResults.data) {
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
      /// TODO: 이거는 리팩토링해서 따로 뺴서 재사용 할 수 있었는데 안 뺐네; => sortAndChangeBookmarkList 메소드처럼 하는 게 맞았음.
      sortAndChangeBookmarkList(pageSize);
      // const slicedList = bookmarks.slice(0, pageSize);
      // const sorted = sortBookmarksByMarketCapRank(slicedList);
      // setBookmarkedListData(sorted);
    }
  };
  /// TODO: 이 메소드처럼 따로 빼는 게 맞았음
  const sortAndChangeBookmarkList = (sliceCount: number) => {
    const slicedList = bookmarks.slice(0, sliceCount);
    const sorted = sortBookmarksByMarketCapRank(slicedList);
    setBookmarkedListData(sorted);
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
      /// TODO: 이거는 리팩토링해서 따로 뺴서 재사용 할 수 있었는데 안 뺐네;
      sortAndChangeBookmarkList(event.target.value);
      // const slicedList = bookmarks.slice(0, event.target.value);
      // const sorted = sortBookmarksByMarketCapRank(slicedList);
      // setBookmarkedListData(sorted);
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
            /// TODO: Sorry ~ 이 변수도 constant 로 뺄 걸..
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
