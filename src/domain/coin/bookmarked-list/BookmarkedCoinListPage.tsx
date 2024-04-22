import CoinTable from '@common/components/CoinTable';
import { useGlobalContext } from '@contexts/GlobalContext';
import { getColumnsData, sortBookmarksByMarketCapRank } from '@lib/utils';
import { styled } from 'styled-components';

const BookmarkedCoinListPage = () => {
  const { bookmarks, currency } = useGlobalContext();

  return (
    <BookmarkedCoinListDiv>
      <CoinTable
        name={'북마크 목록'}
        data={sortBookmarksByMarketCapRank(bookmarks)}
        columns={getColumnsData(currency)}
        noDataMessage="No coins data available"
      />
    </BookmarkedCoinListDiv>
  );
};

export default BookmarkedCoinListPage;

const BookmarkedCoinListDiv = styled.div`
  margin-top: 20px;
`;
