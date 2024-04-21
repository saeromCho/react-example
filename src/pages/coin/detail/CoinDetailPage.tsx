import { getCoin } from "@apis/coin-gecko";
import CoinInfoTable from "@common/components/CoinInfoTable";
import BookmarkIcon from "@common/components/BookmarkIcon";
import { ICoin, ICoinDetail } from "@common/interface/interface";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum } from "@lib/enum";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CoinDescription from "@common/components/CoinDescription";
import CoinPriceAndChangedRate from "@common/components/CoinPriceAndChangedRate";
import CurrencyInput from "@common/components/CurrencyInput";
import LoadingDots from "@common/components/LoadingDots";
import SymbolInput from "@common/components/SymbolInput";
// import arrowImage from "@static/assets/arrow.png";

const CoinDetailPage = () => {
  const { id } = useParams();
  const { bookmarks, changeCurrency } = useGlobalContext();
  const [coinData, setCoinData] = useState<ICoinDetail | null>(null);
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.KRW);
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [symbolAmount, setSymbolAmount] = useState('');
  const [currencyAmount, setCurrencyAmount] = useState('');

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
      errorMessage: '코인 상세 내용을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
});
if (queryResults.error) {
  return <Navigate to="/error" replace />;
}

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
  const toggleArrow = () => {
    setIsDescriptionShown(!isDescriptionShown)
  }
  
  const handleSymbolChange = (value: string) => {
    let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
  
    if (cleanValue) {
      let numericValue = cleanValue[0];
      const parts = numericValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setSymbolAmount(parts.join('.'));
    }

   const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
   const newCurrencyAmount = parseFloat(value) * currentPrice;
   setCurrencyAmount(newCurrencyAmount.toFixed(2));
  };

  const handleCurrencyChange = (value: string) => {
    value = value.replace(/,/g, '');
  
    if (value === "") {
      setCurrencyAmount('');
    } else 
  
    if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
      const parts = value.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setCurrencyAmount(parts.join('.'));
    }

    const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
    const newSymbolAmount = parseFloat(value) / (currentPrice || 1);
    setSymbolAmount(newSymbolAmount.toFixed(8));
  };

  return (
    <div style={{padding: '60px 60px 40px 60px'}}>
      
      {queryResults.isLoading ?<LoadingDots/> : coinData != null?
      <>
          {/* 코인 이름, 드랍다운섹션 */}
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginBottom: '40px'}}>
            <div  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <BookmarkIcon isBookmarked={bookmarks.some(coin => coin.id === coinData!.id)} coin={coinData.market_data} />
              <img style={{marginRight: '8px', width: '40px', height: '40px'}} src={coinData.image.large} alt="Description of Image" />
              <div style={{fontSize: '30px', fontWeight: 'bold'}}>{coinData.localization.ko} ({coinData.symbol.toLocaleUpperCase()})</div>
            </div>
            <select value={currency} onChange={handleChangeCurrency}>
              <option value={CurrencyEnum.KRW}>KRW 보기</option>
              <option value={CurrencyEnum.USD}>USD 보기</option>
            </select>
          </div>
          {/* 시가총액, 웹사이트 // 가격, 상승량 등등 섹션 */}
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginBottom: '50px'}}>
            <CoinInfoTable marketCapRank={coinData.market_cap_rank} websiteUrl={coinData.links.homepage.at(0)}  />
            <CoinPriceAndChangedRate 
                currency={currency}
                currentPrice={coinData.market_data.current_price[currency]} 
                changedRate24HByCurrency={coinData.market_data.price_change_percentage_24h_in_currency[currency]} 
                symbol ={coinData.symbol} 
                changedRate24H={coinData.market_data.price_change_percentage_24h}
                marketCap={coinData.market_data.market_cap[currency]} 
                totalVolume24H={coinData.market_data.total_volume[currency]}
            />
          </div>
          
          {/* 가격 계산 섹션 */}
          <div style={{flexDirection: 'row', justifyContent: 'space-between', border: '1px solid lightgrey', padding: '20px', backgroundColor: 'pink'}}>
          <div style={{fontWeight: 'bold'}}>가격 계산</div>
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', padding: '40px 60px', alignItems: 'center'}}>
            <div>
              {/* <BTCInput /> */}
              <SymbolInput value={symbolAmount} onChange={handleSymbolChange} />
          
            </div>
            <div>
              화살표
              {/* <img src={arrowImage} alt="Logo" /> */}
            </div>
            <div>
              {/* <CurrencyInput currency={currency == CurrencyEnum.KRW ? 'KRW' : 'USD'}/> */}
              <CurrencyInput currency={currency} value={currencyAmount} onChange={handleCurrencyChange} />
            </div>
          </div>
          </div>
          {/* 설명보기 섹션 */}
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20px',marginBottom: '20px', cursor: 'pointer'}}  onClick={toggleArrow}>
            <div >설명 보기</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={"black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `rotate(${isDescriptionShown ? "0" : "180deg"})`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <path d="M5 15l7-7 7 7"/>
              </svg>
          </div>
          {isDescriptionShown && (
              <CoinDescription ko={coinData.description.ko} en={coinData.description.en} />
          )}
          <div>
          </div>
        </> :
        <div> 데이터가 없습니다. </div>
      }
    </div>
);
};

export default CoinDetailPage;
