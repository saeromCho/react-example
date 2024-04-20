import CoinTable from "@common/components/CoinTable";
import { useGlobalContext } from "@contexts/GlobalContext";
import { getColumnsData } from "@lib/utils";

const BookmarkedCoinListPage = () => {
  const { bookmarks, currency } = useGlobalContext();

  return (
    <div>
      <CoinTable name={"북마크 목록"} data={bookmarks} columns={getColumnsData(currency)} noDataMessage="No coins data available" useMinHeight={true} />
    </div>
  );
};

export default BookmarkedCoinListPage;


