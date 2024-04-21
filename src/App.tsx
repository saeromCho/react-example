import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookmarkedCoinListPage from "@pages/coin/bookmarked-list/BookmarkedCoinListPage";
import CoinDetailPage from "@pages/coin/detail/CoinDetailPage";
import TotalCoinListPage from "@pages/coin/total-list/TotalCoinListPage";
import LayoutWithGNB from "@common/components/LayoutWithGNB";
import { Query, QueryCache, QueryClient, QueryClientProvider, QueryKey } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GlobalProvider } from "@contexts/GlobalContext";
import { Toaster } from "react-hot-toast";
import ErrorPage from "@pages/error/ErrorPage";
import ToastPop from "@common/components/ToastPop";

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query: Query<unknown, unknown, unknown, QueryKey>) => {
        if (query.meta?.errorMessage) {
          const errorMessage = typeof query.meta?.errorMessage === 'string' ? query.meta.errorMessage : "An unknown error occurred";
          ToastPop(errorMessage, 4000, 'top-center', '🙏', true);
        } else {
          ToastPop("An error occurred", 4000, 'top-center', '🙏', true);
        }
      },
    }),
  })

	return (
    <QueryClientProvider client={queryClient}>
       <GlobalProvider>
		  <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWithGNB />}>
            <Route index element={<Navigate replace to="/coins" />} />
            <Route path="coins" element={<TotalCoinListPage />} />
            <Route path="bookmarked_list" element={<BookmarkedCoinListPage />} />
          </Route>
          <Route path="/coins/:id" element={<CoinDetailPage />} />
          <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
      <Toaster />
    </GlobalProvider>
    </QueryClientProvider>
	);
};
  
export default App;