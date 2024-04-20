import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BookmarkedCoinListPage from "@pages/coin/bookmarked-list/BookmarkedCoinListPage";
import CoinDetailPage from "@pages/coin/detail/CoinDetailPage";
import TotalCoinListPage from "@pages/coin/total-list/TotalCoinListPage";
import LayoutWithGNB from "@common/components/LayoutWithGNB";
import { Query, QueryCache, QueryClient, QueryClientProvider, QueryKey } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GlobalProvider } from "@contexts/GlobalContext";
import toast, { Toaster } from "react-hot-toast";
import ErrorPage from "@pages/error/ErrorPage";

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query: Query<unknown, unknown, unknown, QueryKey>) => {
        if (query.meta?.errorMessage) {
          const errorMessage = typeof query.meta?.errorMessage === 'string' ? query.meta.errorMessage : "An unknown error occurred";
          toast.error(errorMessage, {
            duration: 4000,
            position: 'top-center',
            icon: '🙏',
          });
        } else {
          toast.error("An error occurred", {
            duration: 4000,
            position: 'top-center',
            icon: '🙏',
          });
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