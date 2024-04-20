import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookmarkedCoinListPage from "@pages/coin/bookmarked-list/BookmarkedCoinListPage";
import CoinDetailPage from "@pages/coin/detail/CoinDetailPage";
import TotalCoinListPage from "@pages/coin/total-list/TotalCoinListPage";
import LayoutWithGNB from "@components/LayoutWithGNB";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const App = () => {
  const queryClient = new QueryClient();
	return (
     <QueryClientProvider client={queryClient}>
		  <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWithGNB />}>
            <Route index element={<Navigate replace to="/coins" />} />
            <Route path="coins" element={<TotalCoinListPage />} />
            <Route path="bookmarked_list" element={<BookmarkedCoinListPage />} />
          </Route>
          <Route path="/coins/:id" element={<CoinDetailPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
	);
};
  
export default App;