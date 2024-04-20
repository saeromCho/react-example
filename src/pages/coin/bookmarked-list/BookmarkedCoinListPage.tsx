import CoinTable from "@common/components/CoinTable";
import { useGlobalContext } from "@contexts/GlobalContext";
import { columnsData } from "@lib/utils";
import { useEffect } from "react";

const BookmarkedCoinListPage = () => {
  const { bookmarks } = useGlobalContext();

  useEffect(() => {
    console.log('업데이트 후', bookmarks);
  }, [bookmarks]);
  

  return (
    <div>
      <CoinTable name={"북마크 목록"} data={bookmarks} columns={columnsData} noDataMessage="No coins data available"
  useMinHeight={true} />
    
    </div>
  );
};

export default BookmarkedCoinListPage;


