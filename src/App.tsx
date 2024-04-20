import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookmarkedListPage from "@pages/bookmarked-list/BookmarkedList";
import CoinDetailPage from "@pages/coins/detail/CoinDetail";
import CoinsListPage from "@pages/coins/CoinsList";
import LayoutWithGNB from "@components/LayoutWithGNB";


const App = () => {
	return (
		<BrowserRouter>
      <Routes>
         <Route path="/" element={<LayoutWithGNB />}>
          <Route index element={<Navigate replace to="/coins" />} />
          <Route path="coins" element={<CoinsListPage />} />
          <Route path="bookmarked_list" element={<BookmarkedListPage />} />
        </Route>
        <Route path="/coins/:id" element={<CoinDetailPage />} />
      </Routes>
    </BrowserRouter>
		
	);
};
  
export default App;