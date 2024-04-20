import CoinTable from "@common/components/CoinTable";
import { useGlobalContext } from "@contexts/GlobalContext";
import { columnsData } from "@lib/utils";

const BookmarkedCoinListPage = () => {
  const { bookmarks } = useGlobalContext();

  return (
    <div>
      <CoinTable name={"북마크 목록"} data={bookmarks} columns={columnsData} noDataMessage="No coins data available" useMinHeight={true} />
    </div>
  );
};

export default BookmarkedCoinListPage;


