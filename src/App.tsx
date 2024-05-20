import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LayoutWithGNB from '@common/components/LayoutWithGNB';
import {
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalProvider } from '@contexts/GlobalContext';
import { Toaster } from 'react-hot-toast';
import ToastPop from '@common/components/ToastPop';
import TotalCoinListPage from '@domain/coin/total-list/TotalCoinListPage';
import BookmarkedCoinListPage from '@domain/coin/bookmarked-list/BookmarkedCoinListPage';
import CoinDetailPage from '@domain/coin/detail/CoinDetailPage';
import ErrorPage from '@domain/error/ErrorPage';

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error, query: Query<unknown, unknown, unknown, QueryKey>) => {
        if (query.meta?.errorMessage) {
          const errorMessage =
            typeof query.meta?.errorMessage === 'string'
              ? query.meta.errorMessage
              : 'An unknown error occurred';
          ToastPop(errorMessage, 4000, 'top-center', '🙏', true);
        } else {
          ToastPop('An error occurred', 4000, 'top-center', '🙏', true);
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        {/* HTML5 History API를 사용하여 URL과 UI를 동기해주는 <Router>.
리액트 라우터 돔을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는 래퍼 컴포넌트. 페이지를 새로고침 하지 않고도 주소를 변경할 수 있도록 해주고, 현재 주소에 관련된 정보를 props로 조회 및 사용을 가능하게 함. */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutWithGNB />}>
              <Route index element={<Navigate replace to="/coins" />} />
              <Route path="coins" element={<TotalCoinListPage />} />
              <Route path="bookmarked_list" element={<BookmarkedCoinListPage />} />
            </Route>
            <Route path="/coins/:id" element={<CoinDetailPage />} />
            <Route path="/error" element={<ErrorPage />}></Route>
            {/* TODO: 이렇게 했어야 했는데 왜 <Route></Route> 왜 이렇게 했어... */}
            {/* <Route path="/error" element={<ErrorPage />} /> */}
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </GlobalProvider>
    </QueryClientProvider>
  );
};

export default App;
