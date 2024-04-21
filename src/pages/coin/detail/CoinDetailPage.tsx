import { getCoin } from "@apis/coin-gecko";
import CoinInfoTable from "@common/components/CoinInfoTable";
import BookmarkIcon from "@common/components/BookmarkIcon";
import { ICoin, ICoinDetail } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum } from "@lib/enum";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const CoinDetailPage = () => {
  const { id } = useParams();
  const { bookmarks, changeCurrency } = useGlobalContext();
  const [coinData, setCoinData] = useState<any>(null);
  const [currency, setCurrency] = useState(CurrencyEnum.KRW);

  
  const getQueryKey = () => {
    return ['coins', id];
  };
  const fetchData = () => {
    return getCoin(id);
  };
  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: fetchData,
    meta: {
      errorMessage: '코인 목록을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
});

  useEffect(() => {
    if (queryResults.data) {
      setCoinData(queryResults.data);
    }
  }, [queryResults.data]);



  useEffect(() => {
    if (queryResults.error) {
      /// TODO: 로직 필요시 추가
      
    }
  }, [queryResults.error]);
  const handleChangeCurrency = (event: any) => {
    
    if(event.target.value == CurrencyEnum.KRW) {
      setCurrency(CurrencyEnum.KRW)
    } else {
      setCurrency(CurrencyEnum.USD)
    }
  };

  if (queryResults.error) {
    return <Navigate to="/error" replace />;
  }
  
  return (
    <>
      <div>코인 상세 페이지</div>
      
      {queryResults.isLoading ? <div>Loading...</div> : 
      <>
          {/* 코인 이름, 드랍다운섹션 */}
          <div className="row" style={{alignContent: 'space-between'}}>
            <div>
              <BookmarkIcon isBookmarked={useGlobalContext().bookmarks.some(coin => coin.id === coinData!.id)} coin={coinData} />
              <img src={coinData.image.thumb} alt="Description of Image" />
              <div>{coinData?.name} ({coinData?.symbol})</div>
            </div>
            <select value={currency} onChange={handleChangeCurrency}>
              <option value={CurrencyEnum.KRW}>KRW 보기</option>
              <option value={CurrencyEnum.USD}>USD 보기</option>
            </select>
          </div>
          {/* 시가총액, 웹사이트 // 가격, 상승량 등등 섹션 */}
          <CoinInfoTable data={coinData} />
          {/* 가격 계산 섹션 */}
          <div>가격 계산 섹션</div>
          <div className='row'>
            <div>
              BTC
            </div>
            <div>
              화살표
            </div>
            <div>
              KRW
            </div>
          </div>
          {/* 설명보기 섹션 */}
          {(coinData.description.ko.length > 0 || coinData.description.en.length > 0) && coinData.description.ko.length > 0 ? coinData.description.ko : coinData.description.en}
          <div>

          </div>
        </>
      }
      <div>{id}</div>
    </>
);
};

export default CoinDetailPage;
