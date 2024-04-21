import { getCoin } from "@apis/coin-gecko";
import CoinInfoTable from "@common/components/CoinInfoTable";
import BookmarkIcon from "@common/components/BookmarkIcon";
import { ICoinDetail } from "@common/interface/interface";
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
import { styled } from "styled-components";
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
  useEffect(() => {
    if (coinData) {
      setSymbolAmount("1.00000000");
        // 널 병합 연산자를 사용하여 undefined일 경우 기본값으로 처리
    const currentPrice = coinData.market_data.current_price[currency];
    setCurrencyAmount((currentPrice ?? 0).toFixed(2));

    }
  }, [coinData, currency]);
  
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
  
  // const handleSymbolChange = (value: string) => {
  //   let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
  
  //   if (cleanValue) {
  //     let numericValue = cleanValue[0];
  //     const parts = numericValue.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setSymbolAmount(parts.join('.'));
  //   }

  //  const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
  //  const newCurrencyAmount = parseFloat(value) * currentPrice;
  //  const newCurrencyAmountToString = newCurrencyAmount.toString();
  //  value = newCurrencyAmountToString.replace(/,/g, '');
  
  //  if (value === "") {
  //    setCurrencyAmount('');
  //  } else 
 
  //  if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
  //    const parts = value.split('.');
  //    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //    setCurrencyAmount(parts.join('.'));
  //  }
  // //  setCurrencyAmount(newCurrencyAmount.toFixed(2));
  // };
  // const handleSymbolChange = (value: string) => {
  //   // 입력값이 비어 있는지 확인하고, 비어 있다면 관련 상태를 모두 초기화
  //   if (value.trim() === "") {
  //     setSymbolAmount('');
  //     setCurrencyAmount('');
  //     return; // 조기 반환으로 추가 로직 실행 방지
  //   }
  
  //   // 입력값에서 콤마를 제거하고 숫자만 추출
  //   let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
    
  //   if (cleanValue) {
  //     let numericValue = cleanValue[0];
  //     const parts = numericValue.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setSymbolAmount(parts.join('.')); // 형식화된 값을 symbol amount로 설정
  //   }
  
  //   // 현재 가격을 가져오고 계산
  //   const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
  //   const newCurrencyAmount = parseFloat(value.replace(/,/g, '')) * currentPrice;
  
  //   // 계산된 값을 문자열로 변환하고 형식화
  //   const newCurrencyAmountToString = newCurrencyAmount.toString();
  //   let formattedCurrencyValue = newCurrencyAmountToString.replace(/,/g, '');
  
  //   // 계산된 값에 대한 형식화 진행
  //   if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(formattedCurrencyValue)) {
  //     const parts = formattedCurrencyValue.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setCurrencyAmount(parts.join('.')); // 형식화된 값을 currency amount로 설정
  //   } else {
  //     setCurrencyAmount(formattedCurrencyValue); // 유효하지 않은 형식이면 원래 값을 그대로 사용
  //   }
  // };
  

  // const handleCurrencyChange = (value: string) => {
  //   value = value.replace(/,/g, '');
  
  //   if (value === "") {
  //     setCurrencyAmount('');
  //   } else 
  
  //   if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
  //     const parts = value.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setCurrencyAmount(parts.join('.'));
  //   }

  //   const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
  //   const newSymbolAmount = parseFloat(value) / (currentPrice || 1);
  //   const newSymbolAmountToString = newSymbolAmount.toString();
  //   if (newSymbolAmountToString.trim() === "") {
  //     setSymbolAmount('');
  //     setCurrencyAmount('');
  //     return; // 조기 반환으로 추가 로직 실행 방지
  //   }
  
  //   // 입력값에서 콤마를 제거하고 숫자만 추출
  //   let cleanValue = newSymbolAmountToString.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
    
  //   if (cleanValue) {
  //     let numericValue = cleanValue[0];
  //     const parts = numericValue.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setSymbolAmount(parts.join('.')); // 형식화된 값을 symbol amount로 설정
  //   }
  //   // setSymbolAmount(newSymbolAmount.toFixed(8));
  // };

  const handleSymbolChange = (value: string) => {
    if (!value.trim()) {
      setSymbolAmount("0");
      setCurrencyAmount("0");
      return;
    }
  
    let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
    if (cleanValue) {
      let numericValue = cleanValue[0];
      const parts = numericValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setSymbolAmount(parts.join('.'));
      const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
      const newCurrencyAmount = parseFloat(numericValue) * currentPrice;
      setCurrencyAmount(newCurrencyAmount.toFixed(2));
    }
  };
  
  const handleCurrencyChange = (value: string) => {
    if (!value.trim()) {
      setSymbolAmount("0");
      setCurrencyAmount("0");
      return;
    }
  
    value = value.replace(/,/g, '');
    if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value)) {
      const parts = value.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setCurrencyAmount(parts.join('.'));
      const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
      const newSymbolAmount = parseFloat(value.replace(/,/g, '')) / currentPrice;
      setSymbolAmount(newSymbolAmount.toFixed(8));
    }
  };
  
  return (
    <div style={{padding: '60px 60px 40px 60px'}}>
      
      {queryResults.isLoading ?<LoadingDots/> : coinData != null?
      <>
          {/* 코인 이름, 드랍다운섹션 */}
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center'}}>
            <div  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <BookmarkIcon isBookmarked={bookmarks.some(coin => coin.id === coinData!.id)} coin={coinData} />
              <img style={{marginRight: '8px', width: '40px', height: '40px'}} src={coinData.image.large} alt="Description of Image" />
              <div style={{fontSize: '30px', fontWeight: 'bold'}}>{coinData.localization.ko} ({coinData.symbol.toLocaleUpperCase()})</div>
            </div>
            <CurrencySelect value={currency} onChange={handleChangeCurrency}>
              <option value={CurrencyEnum.KRW}>KRW 보기</option>
              <option value={CurrencyEnum.USD}>USD 보기</option>
            </CurrencySelect>
          </div>
          {/* 시가총액, 웹사이트 // 가격, 상승량 등등 섹션 */}
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginBottom: '50px', alignItems: 'flex-end'}}>
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
          <div style={{padding: '20px', backgroundColor: 'whitesmoke'}}>
          <div style={{fontWeight: 'bold', color: 'black'}}>가격 계산</div>
          <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingTop: '16px', paddingBottom: '20px', alignItems: 'center'}}>
            <div>
              {/* <BTCInput /> */}
              <SymbolInput value={symbolAmount} onChange={handleSymbolChange} />
          
            </div>
            <div style={{marginLeft: '40px', marginRight: '40px'}}>
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

const CurrencySelect = styled.select`
height: 40px;
border: none;
cursor: pointer;
`;